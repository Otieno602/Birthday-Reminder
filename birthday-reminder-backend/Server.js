const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const birthdayRoutes = require('./routes/birthdays');
app.use('/api/auth', authRoutes);
app.use('/api/birthdays', birthdayRoutes);

// Cron Jobs
require('./cron/monthlyReminder');
require('./cron/upcomingReminder');
require('./cron/dailyReminder');

// Start server
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});