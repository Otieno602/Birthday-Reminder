const express = require('express');
const router = express.Router();

const { getBirthdays, addBirthday, updateBirthday, deleteBirthday } = require('../controllers/birthdayController');

// Routes
router.get('/', getBirthdays);
router.post('/', addBirthday);
router.put('/:_id', updateBirthday);
router.delete('/:_id', deleteBirthday);

module.exports = router;