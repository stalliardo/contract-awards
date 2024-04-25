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

exports.updateADUsers = async (req, res) => {
    console.log('\nupdateADUsersCalled');
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
        const mongoUsers = await Users.find().exec();

        if (usersDataFromAD.length) {
            usersDataFromAD.forEach((userItem) => {
                const formattedObject = { items: [] };
                formattedObject.groupName = userItem.groupName;

                if (userItem.items.length) {
                    userItem.items.forEach((item) => {
                        const itemToAdd = {};
                        const matchingUser = mongoUsers.find(mUser => mUser.name === item.displayName);

                        if(matchingUser) {
                            if(matchingUser.role !== userItem.groupName) {
                                // the role has changed since last sync
                                itemToAdd.operation = "Update"
                            }
                        }

                        if(!matchingUser) {
                            // new user to be added
                            itemToAdd.operation = "Add";
                        }

                        itemToAdd.firstName = item.givenName,
                        itemToAdd.lastName = item.sn,
                        itemToAdd.fullName = item.displayName
                        
                        formattedObject.items.push(itemToAdd);
                    });
                }
                formattedData.push(formattedObject);
            })
        } else {
            return res.status(404).send({ message: "No users found in active directory" });
        }

        const extractedUserNames = [];

        if(formattedData.length) {
            formattedData.forEach((fData) => {
                fData.items.forEach((item) => {
                    extractedUserNames.push(item.fullName);
                })
            })
        }

        if(mongoUsers.length >= usersDataFromAD.length) {
            for(let i = 0; i < mongoUsers.length; i++) {
                const staleUser = !extractedUserNames.includes(mongoUsers[i].name);

                if(staleUser){
                    console.log('Deleting stale user: ', mongoUsers[i].name);
                    await Users.findByIdAndDelete(mongoUsers[i]._id);
                }
            }
        }

        if(formattedData.length) {
            for(let i = 0; i < formattedData.length; i++){
                for(let x = 0; x < formattedData[i].items.length; x++) {

                    console.log('formattedData[i].items = ', formattedData[i].items[x]);
                    if(formattedData[i].items[x].operation === "Add") {
                        console.log('Add operation called');
                        const newRole = formattedData[i].groupName;
                        const fullName = formattedData[i].items[x].fullName;

                        const newUser = new Users({name: fullName, role: newRole});
                        await newUser.save();
                    }

                    if(formattedData[i].items[x].operation === "Update") {
                        console.log('Update operation called');

                        const newRole = formattedData[i].groupName;
                        const userId = mongoUsers.find(user => user.name === formattedData[i].items[x].fullName)._id;

                        await Users.updateOne({ _id: userId }, { $set: { role: newRole } });
                    }
                }
            }
        }

        console.log('bottom called');
        return res.status(200).send({message: "Successfully updated users!"});
    } catch (error) {
        return res.status(500).send({ error: "An error occured. Error: " + error });
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
        // B - The app runs the large updateADUsers function above everytime a user enters the app?

        // Option A:
            // Will need the hidden site admin section / route to hold the ui and logic for this
            // Functions for adding a user, removing a user and moving a user required. although the updateADUsers function handles adding and removing but needs testing


    // TODO's 
        // Make sure these endpoints use the token check middleware



    // if(userLengthFromAD !== mongoUsers.length) <- noty sufficient
    // better mothod required that checks for discrepencies between the ad data returned and the data returned from mongo
    // For each user in mongo check their role then...
        // check if a user with that name also is in the ad data returned
        // if there is a match but the roles differ                                                             ****************** UPDATE THAT USER *********************
        // if the user has is not in the data retuened from ad then have been remoed from the group             ****************** DELETE THAT USER *********************
        // if the user is found but the role is the same do nothing
        // will still first need toi check if a user has been added ie adlength > mongoUsers