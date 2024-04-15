const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

router.get("/auth/protected-route/:token", authenticationController.protectedRoute);

module.exports = router;