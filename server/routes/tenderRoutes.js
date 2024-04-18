const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tendersController');

// router.get("/ad/get-AD-users", tenderController.verifyToken);
router.post("/tenders/generate-initial-data", tenderController.generateInitialData);
router.post("/tenders/generate-data-for-new-location", tenderController.generateDataForNewLocation);


module.exports = router;