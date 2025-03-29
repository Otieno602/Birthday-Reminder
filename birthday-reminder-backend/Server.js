const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Temporary data storage
let birthdays = [];

// Get all birthdays
app.get('/api/birthdays', (req, res) => {
    res.json(birthdays);
});

// Add a new birthday
app.post('/api/birthdays', (req, res) => {
    const { name, date } = req.body;
    if (!name || !date) {
        return res.status(400).json({ message: 'Name and date are required' });
    }
    const newBirthday = { id: Date.now(), name, date };
    birthdays.push(newBirthday);
    res.status(201).json(newBirthday);
});

// Delete a birthday
app.delete('/api/birthdays/:id', (req, res) => {
    birthdays = birthdays.filter(b => b.id != req.params.id);
    res.json({ message: 'Birthday deleted'});
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});