const express = require('express');
const router = express.Router();
const ADController = require('../controllers/ADController');

router.get("/ad/get-AD-users", ADController.handleADUsers);
router.get("/ad/user-exists/:name", ADController.userExists);
router.get("/ad/users-for-group/:group", ADController.retrieveUsersForGroup);


module.exports = router;