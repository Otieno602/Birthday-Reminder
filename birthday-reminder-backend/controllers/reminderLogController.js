const ReminderLog = require('../models/ReminderLog');

const  getAllLogs  = async (req, res) => {
    try {
        const logs = await ReminderLog.find().sort({ sentAt: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
};

module.exports = { getAllLogs };