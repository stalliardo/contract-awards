// const ActiveDirectory = require("activedirectory/lib/activedirectory");
const express = require("express");
const ActiveDirectory = require("activedirectory");
const bodyParser = require("body-parser");

require('dotenv').config()

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

// initialize active directory connection:
var config = { url: `ldap://${process.env.DOMAIN_IP}:389`, // TODO see if i can use the secure LDAPS
               baseDN: 'dc=DAZCORP,dc=COM',
               username: 'administrator@DAZCORP.COM',
               password: process.env.DOMAIN_PASSWORD }  // TODO <- env variable
var ad = new ActiveDirectory(config);

app.post("/login", (req, res) => {
    console.log('POST login called');
    
    const username = `${req.body.username}@DAZCORP.COM`;
    const password = req.body.password;
    
    console .log('username and password = ', username, " ", password);

    ad.authenticate(username, password, function(err, auth) {
        if(err) {
            console.log("LDAP error: ", err);

            return res.status(401).json({error: "Invalid Credentials"})
        }

        if(auth) {
            console.log('LDAP Authentication successful!');
            console.log('auth = ', auth);

            return res.json({message: "Authetication Successful"})
        } 

        else {
            console.log('Authentication failed!');
            return res.status(500).json({error: "Authentication failed"})
        }
    })
})
app.get("/api", (req, res) => {
    console.log('api route called + testing env = ', process.env.DOMAIN_PASSWORD);
    res.json({message: "Hello from the node server!"})
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})