const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config;

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDb
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const birthdayRoutes = require('./routes/birthdays');
app.use('/api/birthdays', birthdayRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});