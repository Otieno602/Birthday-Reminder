const Birthday = require('../models/Birthday');

// Get all birthdays
const getBirthdays = async (req, res) => {
    try {
        const birthdays = await Birthday.find();
        res.json(birthdays);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch birthdays' });
    }
};

// Add a birthday
const addBirthday = async (req, res) => {
    const { name, date } = req.body;
    
    if (!name || !date) {
        return res.status(400).json({ message: 'Name and date are required.' });
    }
    try {
        const newBirthday = new Birthday({ name, date });
        await newBirthday.save();
        console.log('Received birthday:', req.body);
        console.log('Creating new birthday:', newBirthday);
        res.status(201).json(newBirthday);
    } catch (error) {
        res.status(400).json({ message: 'Failed to add birthday' });
    }
};

// Update a birthday
const updateBirthday = async (req, res) => {
    try {
        const { _id } = req.params;
        const updated = await Birthday.findByIdAndUpdate(_id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update birthday' });
    }
};

// Delete a birthday
const deleteBirthday = async (req, res) => {
    try{
        const { _id } = req.params;
        await Birthday.findByIdAndDelete(_id);
        res.json({ message: 'Birthday deleted' });        
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete birthday' });
    }
};

module.exports = {
    getBirthdays,
    addBirthday,
    updateBirthday,
    deleteBirthday
};