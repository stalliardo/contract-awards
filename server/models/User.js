const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true }, // Director, regional or user
     // TODO
});

module.exports = mongoose.model("User", usersSchema);