const mongoose = require('mongoose');

const awardsDiaryItemSchema = new mongoose.Schema({
  contractNumber: { type: String, required: true },
  project: { type: String, required: true },
  programme: { type: String, required: true },
  contractor: { type: String, required: true },
  region: { type: String, required: true },
  core: { type: String, required: true }
});

const AwardsDiaryItem = mongoose.model('AwardsDiaryItem', awardsDiaryItemSchema);

module.exports = AwardsDiaryItem;
