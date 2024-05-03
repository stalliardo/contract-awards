const express = require('express');
const router = express.Router();
const awardsDiaryItemController = require('../controllers/awardsDiaryItemController');

router.post("/awards-diary/add-item", awardsDiaryItemController.addAwardsDiaryItem);
router.patch("/awards-diary/edit-item", awardsDiaryItemController.editAwardsDiaryItem);
router.delete("/awards-diary/:awardsDiaryId/items/:awardsDiaryItemId", awardsDiaryItemController.deleteAwardsDiaryItem);

module.exports = router;