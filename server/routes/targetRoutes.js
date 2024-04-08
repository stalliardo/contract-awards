const express = require('express');
const router = express.Router();
const targetController = require('../controllers/TargetsController');

router.get("/targets", targetController.getTargets);
router.post("/target", targetController.addTarget);

module.exports = router;