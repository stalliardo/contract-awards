const express = require('express');
const router = express.Router();
const awardsDiaryController = require('../controllers/awardsDiaryController');
const awardsDiaryItemController = require('../controllers/awardsDiaryItemController');

// POST request to create a new awards diary entry
router.post('/awards-diary', awardsDiaryController.createAwardsDiary);

// GET request to fetch all awards diary entries
router.get('/awards-diary', awardsDiaryController.getAllAwardsDiary);

// GET all records for location
router.get('/awards-diary/location', awardsDiaryController.getAwardsForLocation);

router.post('/awards-diary/add-year', awardsDiaryController.createAwardsDiariesForYear);

router.get('/awards-diary/getAllAwards', awardsDiaryController.getAllAwards);

module.exports = router;