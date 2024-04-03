const express = require('express');
const router = express.Router();
const ADController = require('../controllers/ADController');

// router.post("/location/add-item", locationController.addLocation);
// router.get('/location/get-locations', locationController.getAllLocations);

router.get("/ad/user-exists/:name", ADController.userExists);

module.exports = router;