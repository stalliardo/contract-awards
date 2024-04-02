// const ActiveDirectory = require("activedirectory/lib/activedirectory");
const express = require("express");
const ActiveDirectory = require("activedirectory");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./server/database/db"); // Import the database connection utility

const awardsDiaryRoutes = require("./server/routes/awardsDiaryRoutes");
const awardsDiaryItemRoutes = require("./server/routes/awardsDiaryItemRoutes");
const locationRoutes = require("./server/routes/locationRoutes");
const memberRoutes = require("./server/routes/memberRoutes");

const { generateTableForYear } = require("./server/utils/AwardsDiaryUtils");

require('dotenv').config()

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use("/api", awardsDiaryRoutes); // Will this cause issue with the "/api" call down the bottom
app.use("/api", awardsDiaryItemRoutes);
app.use("/api", locationRoutes);
app.use("/api", memberRoutes);

// initialize active directory connection:
var config = {
    url: `ldap://${process.env.DOMAIN_IP}:389`, // TODO see if i can use the secure LDAPS
    baseDN: 'dc=DAZCORP,dc=COM',
    username: 'administrator@DAZCORP.COM',
    password: process.env.DOMAIN_PASSWORD
}  // TODO <- env variable
var ad = new ActiveDirectory(config);

app.post("/login", (req, res) => {
    console.log('POST login called');

    const username = `${req.body.username}@DAZCORP.COM`;
    const password = req.body.password;

    console.log('username and password = ', username, " ", password);

    ad.authenticate(username, password, function (err, auth) {
        if (err) {
            console.log("LDAP error: ", err);

            return res.status(401).json({ error: "Invalid Credentials" })
        }

        if (auth) {
            console.log('LDAP Authentication successful!');
            console.log('auth = ', auth);

            return res.json({ message: "Authetication Successful" })
        }

        else {
            console.log('Authentication failed!');
            return res.status(500).json({ error: "Authentication failed" })
        }
    })
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from the node server!" })
})

// re-enable below to run the built application
// app.use(express.static(path.join(__dirname, 'client/build')));
// app.get("*", (req, res) => {
//     console.log('star route called');
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// })

// how do i trigger the crud operations from the frontend? and how will they be received in the backend?

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    // generateTableForYear() // TODO for testing purposes currently
})