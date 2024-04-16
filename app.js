// const ActiveDirectory = require("activedirectory/lib/activedirectory");
const express = require("express");
const ActiveDirectory = require("activedirectory2");
const bodyParser = require("body-parser");
const path = require("path");
// const ADConfig = require("./server/utils/ADUtils")

const db = require("./server/database/db"); // Import the database connection utility

const awardsDiaryRoutes = require("./server/routes/awardsDiaryRoutes");
const awardsDiaryItemRoutes = require("./server/routes/awardsDiaryItemRoutes");
const locationRoutes = require("./server/routes/locationRoutes");
const userRoutes = require("./server/routes/userRoutes");
const ADRoutes = require("./server/routes/ADRoutes");
const targetRoutes = require("./server/routes/targetRoutes");
const authenticationRoutes = require("./server/routes/AuthenticationRoutes");

const jwt = require("./server/utils/JWTUtils");

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
app.use("/api", userRoutes);
app.use("/api", ADRoutes);
app.use("/api", targetRoutes);
app.use("/api", authenticationRoutes);

const ADConfig = {
    url: `ldap://${process.env.DOMAIN_IP}:389`, // TODO see if i can use the secure LDAPS
    baseDN: 'dc=DAZCORP,dc=COM',
    username: 'administrator@DAZCORP.COM',
    password: process.env.DOMAIN_PASSWORD
} 

var ad = new ActiveDirectory(ADConfig);

app.post("/login", (req, res) => {
    const username = `${req.body.username}@DAZCORP.COM`;
    const password = req.body.password;


    const token = jwt.generateJWT(username);

    return res.json({message: "Authetication Successful", token});



    // ad.authenticate(username, password, function (err, auth) {
    //     if (err) {
    //         console.log("LDAP error: ", err);

    //         return res.status(401).json({ error: "Invalid Credentials" })
    //     }

    //     if (auth) {
    //         console.log('LDAP Authentication successful!');
    //         console.log('auth = ', auth);

    //         return res.json({message: "Authetication Successful", token});

    //         // return res.json({ message: "Authetication Successful" })
    //     }

    //     else {
    //         console.log('Authentication failed!');
    //         return res.status(500).json({ error: "Authentication failed" })
    //     }
    // })
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    // generateTableForYear() // TODO for testing purposes currently
})