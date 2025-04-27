// Import the getDatabase function to access the database
const { getDatabase } = require('../../utils/database');

// Authentication middleware function
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // If no Authorization header is present, send 401 Unauthorized
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

   
    const token = authHeader.split(' ')[1];

    const db = getDatabase();

   
    const user = db.users.find(u => u.token === token);

    // If no matching user is found, send 401 Unauthorized
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;

    // Call the next middleware/route handler
    next();
};
module.exports = authenticate;
