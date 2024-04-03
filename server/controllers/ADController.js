

const ActiveDirectory = require("activedirectory2");

const getConfig = () => {
    return {
        url: `ldap://${process.env.DOMAIN_IP}:389`, // TODO see if i can use the secure LDAPS
        baseDN: 'dc=DAZCORP,dc=COM',
        username: 'administrator@DAZCORP.COM',
        password: process.env.DOMAIN_PASSWORD
    }
}

exports.getADUsers = async (req, res) => {
    try {
        const ADConfig = getConfig();
        const AD = new ActiveDirectory(ADConfig);


        // get the users from the 3 groups and check the length


        const groupNames = ["CA01", "CA02", "CA03"];
        
        const promiseLoop = new Promise((res, rej) => {
            const usersDataFromAD = [];

            groupNames.forEach((group) => {
                AD.getUsersForGroup(group, (err, users) => {
                    if(err) {
                        console.log('ERROR: ' +JSON.stringify(err));
                        rej();
                    }
        
                    if(users) {
                        console.log('users called + users = ', users);
                        usersDataFromAD.push({groupName: group});
                    }
                })
            })

            res(usersDataFromAD);
        })

        // groupNames.forEach((group) => {
        //     console.log('group called + group = ', group);
        //     AD.getUsersForGroup(group, (err, users) => {
        //         if(err) {
        //             console.log('ERROR: ' +JSON.stringify(err));
        //             return
        //         }
    
        //         if(users) {
        //             console.log('users called + users = ', users);
        //             usersDataFromAD.push({groupName: group});
                    
        //         }
        //     })
        // })
        // console.log('users from AD = ', usersDataFromAD);

        const tData = await promiseLoop();
        console.log('data from promise = ', tData);
        
        return res.status(200);
        
    } catch (error) {
        return res.status(500).send({message: "An error occured", error});
    }
}

exports.userExists = async (req, res) => {
    try {
        const ADConfig = getConfig();
        const { name } = req.params; // first.last format works
        const AD = new ActiveDirectory(ADConfig);

        AD.userExists(name, (err, exists) => {
            if(err) {
                console.log('ERROR: ' +JSON.stringify(err));
                return res.status(500).send({message: "An error occured"});
            }

            if(exists) {
                return res.status(200).send({message: "The user was found"});
            }

            return res.status(404).send({message: "The user was not found"});
        })
    } catch (error) {
        return res.status(500).send({message: "An error occured"});
    }
}

exports.retrieveUsersForGroup = async (req, res) => {
    try {
        const ADConfig = getConfig();
        const { group } = req.params; // first.last format works
        const AD = new ActiveDirectory(ADConfig);
        
        AD.getUsersForGroup(group, (err, users) => {
            if(err) {
                console.log('ERROR: ' +JSON.stringify(err));
                return res.status(500).send({message: "An error occured"});
            }

            if(users) {
                return res.status(200).send({message: "Users found", users});
            }

            return res.status(404).send({message: "No users found"});
        })
    } catch (error) {
        return res.status(500).send({message: "An error occured"});
    }
}
