const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.get('/users', userController.getUsers);
router.post("/users/location", userController.addLocationToUser);
router.put("/users/:userId/locations", userController.addAllLocationsToUser);
router.delete('/users/:userId/location/:location', userController.removeLocationFromUser);

module.exports = router;