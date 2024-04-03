const ADConfig = {
    url: `ldap://${process.env.DOMAIN_IP}:389`, // TODO see if i can use the secure LDAPS
    baseDN: 'dc=DAZCORP,dc=COM',
    username: 'administrator@DAZCORP.COM',
    password: process.env.DOMAIN_PASSWORD
}  

module.exports = { ADConfig }; 