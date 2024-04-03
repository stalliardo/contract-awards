const express = require('express');
const router = express.Router();
const ADController = require('../controllers/ADController');

router.get("/ad/user-exists/:name", ADController.userExists);

module.exports = router;