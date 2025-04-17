const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
    
        if (existingUser) return res.status(400).json({ message: 'User already exists'});

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error', error);
        res.status(500).json({ message: 'Something went wrong. Try again later!'});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ message: 'Invalid Email or Password' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(401).json({ message: 'Invalid Email or Password' });

        // Genarate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Login Failed. Try again later.' })
    }
};

module.exports = { registration, login }