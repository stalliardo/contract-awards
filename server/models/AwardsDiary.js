const mongoose = require("mongoose");

const awardsDiarySchema = new mongoose.Schema({
    year: {type: String, required: true},
    financialYear: {type: String, required: true},

    month: { type: String, required: true },
    location: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AwardsDiaryItem' }]
});

module.exports = mongoose.model("AwardsDiary", awardsDiarySchema);