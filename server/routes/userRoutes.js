const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.post("/users/location", userController.addLocationToUser);
router.get('/users', userController.getUsers);
router.delete('/users/:userId/location/:location', userController.removeLocationFromUser);

module.exports = router;