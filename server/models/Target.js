const mongoose = require("mongoose");

const targetSchema = new mongoose.Schema({
    category: { type: String, required: true },
    financialYear: { type: String, required: true },
    location: { type: String, required: true },
    targetValue: { type: String, required: true },
});

module.exports = mongoose.model("Target", targetSchema);