const express = require('express');
const { registration, login } = require('../controllers/authController');
const router = express.Router();

router.post('/registration', registration);
router.post('/login', login);

module.exports = router;