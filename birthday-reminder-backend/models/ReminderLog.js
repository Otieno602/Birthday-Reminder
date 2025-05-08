const mongoose = require('mongoose');

const reminderLogSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['monthly', '3-day', 'same-day'],
        required: true
    },
    birthdayName: {
        type: String
    },
    birthdayDate: {
        type: Date
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ReminderLog', reminderLogSchema);