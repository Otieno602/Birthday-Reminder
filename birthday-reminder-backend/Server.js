const express = require('express');
const router = express.Router();
const Birthday = require('./models/Birthday');
const connectDB = require('./config/db');
require('dotenv').config;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// Middleware and routes go here
app.use(express.json());

// Temporary data storage
let birthdays = [];

// Get all birthdays
router.get('/', async (req, res) => {
    try {
        const birthdays = await Birthday.find();
        res.json(birthdays);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new birthday
app.post('/api/birthdays', (req, res) => {
    const { name, date } = req.body;
    if (!name || !date) {
        return res.status(400).json({ message: 'Name and date are required' });
    }
    const newBirthday = { _id: Date.now(), name, date };
    birthdays.push(newBirthday);
    res.status(201).json(newBirthday);
});

// Edit birthday
app.put('/api/birthdays/:_id', (req, res) => {
    const { _id } = req.params;
    const { name, date } = req.body;

    if (!name || !date) {
        return res.status(400).json({ message: 'Name and date are required' });
    }

    let birthday = birthdays.find(b => b._id == _id);
        if (!birthday) {
            return res.status(404).json({ message: 'Birthday not found' });
        }

    // Update the birthday
    birthday.name = name;
    birthday.date = date;

    res.json(birthday);
})

// Delete a birthday
app.delete('/api/birthdays/:_id', (req, res) => {
    birthdays = birthdays.filter(b => b._id != req.params._id);
    res.json({ message: 'Birthday deleted'});
});

// Start server
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});