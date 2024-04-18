const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tendersController');

router.get("/tenders", tenderController.getTenders);
router.post("/tenders/generate-initial-data", tenderController.generateInitialData);
router.post("/tenders/generate-data-for-new-location", tenderController.generateDataForNewLocation);


module.exports = router;