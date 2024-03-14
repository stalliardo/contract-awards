const mongoose = require("mongoose");

const awardsDiarySchema = new mongoose.Schema({
    year: {type: String, required: true}, // TODO this isnt the best way to handle this
    month: { type: String, required: true },
    location: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AwardsDiaryItem' }]
});

const awardsDiary = mongoose.model("AwardsDiary", awardsDiarySchema);