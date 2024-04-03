

const ActiveDirectory = require("activedirectory2").promiseWrapper;

const getConfig = () => {
    return {
        url: `ldap://${process.env.DOMAIN_IP}:389`, // TODO see if i can use the secure LDAPS
        baseDN: 'dc=DAZCORP,dc=COM',
        username: 'administrator@DAZCORP.COM',
        password: process.env.DOMAIN_PASSWORD
    }
}

// exports.getADUsers = async (req, res) => {
//     try {
//         const ADConfig = getConfig();
//         const AD = new ActiveDirectory(ADConfig);


//         const groupNames = ["CA01", "CA02", "CA03"];

//         const usersDataFromAD = [];

//         const promises = []; 

//         groupNames.forEach((group) => {
//             promises.push(AD.getUsersForGroup(group));
//         })


//         Promise.all(promises).then((res) => {
//             console.log('res = ', res);
//             res.forEach((i) => {
//                 i.forEach((x) => {
//                     console.log('x.dn = ', x.dn);
//                 })
//             })
//         }),

//         console.log('after called.....');


//         // const tData = await getData();




//         return res.status(200);

//     } catch (error) {
//         return res.status(500).send({ message: "An error occured", error });
//     }
// }

exports.getADUsers = async (req, res) => {
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
                    console.log('i = ', i);
                })
            })
        }

        // Now need to check the length of the items in the arraty above against the users in the DB - Requires thought!!!!

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



