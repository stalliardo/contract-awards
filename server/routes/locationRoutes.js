const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationsController');

router.post("/location/add-item", locationController.addLocation);
router.get('/location/get-locations/:financialYear', locationController.getAllLocations);

module.exports = router;