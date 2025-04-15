const express = require('express');
const router = express.Router();
const verifyApiKey = require('../middlewares/verifyApiKey');

const { getBirthdays, addBirthday, updateBirthday, deleteBirthday } = require('../controllers/birthdayController');
const protect = require('../middlewares/authMiddleware');

// Applying middleware to all birthday routes
router.use(verifyApiKey);

// Routes
router.get('/', protect, getBirthdays);
router.post('/', protect, addBirthday);
router.put('/:_id', protect, updateBirthday);
router.delete('/:_id', protect, deleteBirthday);

module.exports = router;