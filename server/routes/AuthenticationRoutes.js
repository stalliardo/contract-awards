const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

router.get("/auth/verify/:token", authenticationController.verifyToken);

module.exports = router;