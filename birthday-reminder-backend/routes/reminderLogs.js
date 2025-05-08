const express = require('express');
const { getAllLogs } = require('../controllers/reminderLogController');

const router = express.Router();

router.get('/', getAllLogs);

module.exports = router;