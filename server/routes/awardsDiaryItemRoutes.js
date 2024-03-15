const express = require('express');
const router = express.Router();
const awardsDiaryController = require('../controllers/awardsDiaryController');
const awardsDiaryItemController = require('../controllers/awardsDiaryItemController');


router.post("/awards-diary/add-item", awardsDiaryItemController.addAwardsDiaryItem);
router.delete("/awards-diary/:awardsDiaryId/items/:awardsDiaryItemId", awardsDiaryItemController.deleteAwardsDiaryItem);


module.exports = router;
