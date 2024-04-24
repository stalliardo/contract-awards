const ActiveDirectory = require("activedirectory2").promiseWrapper;
const Users = require("../models/User");

const getConfig = () => {
    return {
        url: `ldap://${process.env.DOMAIN_IP}:389`, // TODO see if i can use the secure LDAPS
        baseDN: 'dc=DAZCORP,dc=COM',
        username: 'administrator@DAZCORP.COM',
        password: process.env.DOMAIN_PASSWORD
    }
}

//TODO renmae 
exports.handleADUsers = async (req, res) => {
    console.log('\nhandleADUsersCalled');
    try {
        const ADConfig = getConfig();
        const AD = new ActiveDirectory(ADConfig);
        const groupNames = ["CA01", "CA02", "CA03"];
        const usersDataFromAD = [];

        for (let i = 0; i < groupNames.length; i++) {
            const usersData = await AD.getUsersForGroup(groupNames[i]);
            usersDataFromAD.push({ groupName: groupNames[i], items: usersData })
        }

        const formattedData = [];
        let userLengthFromAD = 0;

        if (usersDataFromAD.length) {
            usersDataFromAD.forEach((userItem) => {
                const formattedObject = { items: [] };
                formattedObject.groupName = userItem.groupName;

                if (userItem.items.length) {
                    userItem.items.forEach((item) => {
                        formattedObject.items.push({
                            firstName: item.givenName,
                            lastName: item.sn,
                            fullName: item.displayName,
                        })
                    });
                }
                formattedData.push(formattedObject);
            })

            formattedData.forEach((d) => {
                d.items.forEach((i) => {
                    // Get the length of the users to used in the following conditional statements
                    userLengthFromAD++;
                })
            })
        }

        const allUsers = await Users.find().exec();

        if(userLengthFromAD !== allUsers.length) {
            if(allUsers.length) {
                if(allUsers.length > userLengthFromAD){
                    // Someone was removed
                    const namesFromAd = [];
                    for(let i = 0; i < formattedData.length; i++) {
                        for(let x = 0; x < formattedData[i].items.length; x++) {
                            const fullName = formattedData[i].items[x].fullName;
                            namesFromAd.push(fullName);
                        }
                    }

                    for(let i = 0; i < allUsers.length; i++) {
                        const matchingUser = namesFromAd.find((user) => user === allUsers[i].name);
                        if(!matchingUser){
                            //  Remove the old record from the Database...
                            await Users.findByIdAndDelete(allUsers[i]._id);
                            console.log('Removing ' + allUsers[i].name + " from the database");
                        }
                    }

                } else if(allUsers.length < userLengthFromAD) {
                    // Someone was added
                    for(let i = 0; i < formattedData.length; i++) {
                        const groupName = formattedData[i].groupName;
    
                        for(let x = 0; x < formattedData[i].items.length; x++) {
                            const fullName = formattedData[i].items[x].fullName;
                            const newItem = allUsers.find((user) => user.name === fullName);

                            if(!newItem) {
                                const newUser = new Users({name: fullName, role: groupName});
                                await newUser.save();
                                console.log('Added new user: ', fullName);
                            }
                        }
                    }
                }
            } else {
                for(let i = 0; i < formattedData.length; i++) {
                    const groupName = formattedData[i].groupName;

                    for(let x = 0; x < formattedData[i].items.length; x++) {
                        const fullName = formattedData[i].items[x].fullName;

                        const newUser = new Users({name: fullName, role: groupName});
                        await newUser.save();
                        console.log('New user ' + fullName + " added!");
                    }
                }
            }
        }
        return res.status(200);
    } catch (error) {
        return res.status(500).send({ message: "An error occured", error });
    }
}

exports.userExists = async (req, res) => {
    try {
        const ADConfig = getConfig();
        const { name } = req.params; // first.last format works
        const AD = new ActiveDirectory(ADConfig);

        AD.userExists(name, (err, exists) => {
            if (err) {
                console.log('ERROR: ' + JSON.stringify(err));
                return res.status(500).send({ message: "An error occured" });
            }
            if (exists) {
                return res.status(200).send({ message: "The user was found" });
            }
            return res.status(404).send({ message: "The user was not found" });
        })
    } catch (error) {
        return res.status(500).send({ message: "An error occured" });
    }
}

exports.retrieveUsersForGroup = async (req, res) => {
    try {
        const ADConfig = getConfig();
        const { group } = req.params; // first.last format works
        const AD = new ActiveDirectory(ADConfig);

        AD.getUsersForGroup(group, (err, users) => {
            if (err) {
                console.log('ERROR: ' + JSON.stringify(err));
                return res.status(500).send({ message: "An error occured" });
            }
            if (users) {
                return res.status(200).send({ message: "Users found", users });
            }
            return res.status(404).send({ message: "No users found" });
        })
    } catch (error) {
        return res.status(500).send({ message: "An error occured" });
    }
}


// Scenarios: 
    // A user is moved from one folder to another CA03(user level) => CA02(RD level)
    // Issue: the app will have idea that the change has taken place so will still think the user has the previous access level
    // Handling Options: 
        // A - Will have to change their folder access in Active Directory anyway so do we jump in the app and call a function?
        // B - The app runs the large handleADUsers function above everytime a user enters the app?

        // Option A:
            // Will need the hidden site admin section / route to hold the ui and logic for this
            // Functions for adding a user, removing a user and moving a user required. although the handleADUsers function handles adding and removing but needs testing


    // TODO's 
        // Make sure these endpoints use the token check middleware