const express = require('express');
const router = express.Router();
const verifyApiKey = require('../middlewares/verifyApiKey');

const { getBirthdays, addBirthday, updateBirthday, deleteBirthday } = require('../controllers/birthdayController');

// Applying middleware to all birthday routes
router.use(verifyApiKey);

// Routes
router.get('/', getBirthdays);
router.post('/', addBirthday);
router.put('/:_id', updateBirthday);
router.delete('/:_id', deleteBirthday);

module.exports = router;