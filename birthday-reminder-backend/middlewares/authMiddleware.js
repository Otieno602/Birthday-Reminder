const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if authorization headers exist ans start with Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Extract token
    const token = authHeader.split(' ')[1]; 
    try {
        // verify token using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the decoded user data to the request
        req.user = decoded;
        // Allow the request to move forward
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid Token' });
    }
};

module.exports = protect;