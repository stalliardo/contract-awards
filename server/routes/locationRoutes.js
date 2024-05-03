const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationsController');

router.post("/location/add-item", locationController.addLocation);
router.get('/location/get-locations', locationController.getAllLocations);

module.exports = router;