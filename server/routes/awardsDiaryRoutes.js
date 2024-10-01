const express = require('express');
const router = express.Router();
const awardsDiaryController = require('../controllers/awardsDiaryController');
const awardsDiaryItemController = require('../controllers/awardsDiaryItemController');
const { verifyToken } = require('../utils/JWTUtils');

// POST request to create a new awards diary entry
router.post('/awards-diary', awardsDiaryController.createAwardsDiary);

// GET request to fetch all awards diary entries
router.get('/awards-diary', awardsDiaryController.getAllAwardsDiary);

// GET all records for location
router.get('/awards-diary/location', awardsDiaryController.getAwardsForLocation);

// Is this a duplicate of the getallawardDiary ????
router.get('/awards-diary/getAllAwards', awardsDiaryController.getAllAwards);

// below need locking down TODO
router.post('/awards-diary/add-year', awardsDiaryController.createAwardsDiariesForYear);
router.get("/awards-diary/generateAllData/:token", verifyToken, awardsDiaryController.generateAllDataForYear);

module.exports = router;