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

router.post("/awards-diary/add-item", awardsDiaryItemController.addAwardsDiaryItem);

// // GET request to fetch a single awards diary entry by ID
// router.get('/awards-diary/:id', awardsDiaryController.getAwardsDiaryById);

// // PUT request to update an existing awards diary entry by ID
// router.put('/awards-diary/:id', awardsDiaryController.updateAwardsDiaryById);

// // DELETE request to delete an awards diary entry by ID
// router.delete('/awards-diary/:id', awardsDiaryController.deleteAwardsDiaryById);

module.exports = router;
