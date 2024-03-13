const mongoose = require("mongoose");

const awardsDiarySchema = new mongoose.Schema({
    year: {type: String, required: true}, // TODO this isnt the best way to handle this
});