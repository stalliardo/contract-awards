const AwardsDiary = require('../models/AwardsDiary');

// TODO
exports.createAwardsDiary = async (req, res) => {
    console.log('CAKKED');
  try {
    const awardsDiary = new AwardsDiary(req.body);
    await awardsDiary.save();
    res.status(201).send(awardsDiary);
  } catch (error) {
    res.status(400).send(error);
  }
};

// TODO
exports.getAllAwardsDiary = async (req, res) => {
    console.log('CALLED');
  try {
    const awardsDiaryEntries = await AwardsDiary.find();
    res.send(awardsDiaryEntries);
  } catch (error) {
    res.status(500).send(error);
  }
};