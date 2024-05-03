const mongoose = require("mongoose");

const tenderItemSchama = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: undefined }, // Prevent automatic generation of _id
    month: {type: String, required: true},
    value: {type: Number, required: true},
})

const tendersSchema = new mongoose.Schema({
    location: { type: String, required: true },
    items: [tenderItemSchama]
});

module.exports = mongoose.model("Tender", tendersSchema);