// controllers/awardsDiaryItemController.js

const AwardsDiaryItem = require('../models/AwardsDiaryItem');
const AwardsDiary = require('../models/AwardsDiary');

exports.addAwardsDiaryItem = async (req, res) => {
  try {
    // Parse request data
    const { awardsDiaryId, contractNumber, project, programme, contractor, region, core } = req.body;

    // Validation (e.g., check required fields)
    if (!awardsDiaryId || !contractNumber || !project || !programme || !contractor || !region || !core) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if AwardsDiary exists
    const awardsDiary = await AwardsDiary.findById(awardsDiaryId);
    if (!awardsDiary) {
      return res.status(404).json({ error: 'AwardsDiary not found' });
    }

    // Create new AwardsDiaryItem instance associated with AwardsDiary
    const newAwardsDiaryItem = new AwardsDiaryItem({
      awardsDiary: awardsDiaryId,
      contractNumber,
      project,
      programme,
      contractor,
      region,
      core
      // Add other fields as needed
    });

    // Save to database
    await newAwardsDiaryItem.save();

    // Add the new AwardsDiaryItem to the AwardsDiary's items array
    awardsDiary.items.push(newAwardsDiaryItem._id);
    await awardsDiary.save();

    // Send response
    res.status(201).json(newAwardsDiaryItem);
  } catch (error) {
    console.error('Error adding awardsDiaryItem:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
