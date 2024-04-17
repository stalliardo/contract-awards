const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tendersController');

router.get("/ad/get-AD-users", tenderController.verifyToken);



module.exports = router;