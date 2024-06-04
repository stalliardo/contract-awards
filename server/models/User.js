const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    samAccountName: { type: String, required: true },
    role: { type: String, required: true }, // Director, regional or user
    locations: [{type: String}]
});

module.exports = mongoose.model("User", usersSchema);