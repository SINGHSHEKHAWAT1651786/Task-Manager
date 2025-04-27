// Import necessary modules
const express = require('express');
const router = express.Router();

// Import database utility functions to get and save the database
const { getDatabase, saveDatabase } = require('../utils/database');

// Route handler for user registration
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const db = getDatabase();

    if (db.users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = {
        id: Date.now(), 
        username,
        password
    };

    db.users.push(newUser);
    saveDatabase(db);

    res.status(201).json({ message: 'Registration successful' });
});

// Route handler for user login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const db = getDatabase();

    // Find the user by matching the username and password
    const user = db.users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = `${user.id}-${Date.now()}`;

  
    user.token = token;
    saveDatabase(db);
    res.json({ token });
});

module.exports = router;
