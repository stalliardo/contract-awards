const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

// router.post("/location/add-item", locationController.addLocation);
router.get('/users', userController.getUsers);

module.exports = router;