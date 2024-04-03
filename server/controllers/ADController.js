

const ActiveDirectory = require("activedirectory2");

const getConfig = () => {
    return {
        url: `ldap://${process.env.DOMAIN_IP}:389`, // TODO see if i can use the secure LDAPS
        baseDN: 'dc=DAZCORP,dc=COM',
        username: 'administrator@DAZCORP.COM',
        password: process.env.DOMAIN_PASSWORD
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
