// Import necessary modules
const express = require('express');
const router = express.Router();
const { getDatabase, saveDatabase } = require('../utils/database');

// Route to create a new task
router.post('/', (req, res) => {
    const db = getDatabase(); 
    const { title } = req.body; 

    // Create a new task object
    const newTask = {
        id: Date.now(), 
        title,
        completed: false, 
        userId: req.user.id, 
        createdAt: new Date() 
    };

    db.tasks.push(newTask); 
    saveDatabase(db); 
    res.status(201).json(newTask);
});

// Route to get all tasks for the current user
router.get('/', (req, res) => {
    const db = getDatabase(); 
    const tasks = db.tasks.filter(task => task.userId === req.user.id); 
    res.json(tasks);
});

// Route to delete a specific task
router.delete('/:id', (req, res) => {
    const db = getDatabase(); 
    const taskId = parseInt(req.params.id); 

    db.tasks = db.tasks.filter(task => !(task.id === taskId && task.userId === req.user.id));
    saveDatabase(db);
    res.json({ message: 'Task deleted' }); 
});

// Route to toggle completion status of a task
router.put('/:id', (req, res) => {
    const db = getDatabase(); 
    const taskId = parseInt(req.params.id); 

    // Find the task belonging to the current user
    const task = db.tasks.find(t => t.id === taskId && t.userId === req.user.id);
    if (!task) return res.status(404).json({ message: 'Task not found' }); 

    task.completed = !task.completed; 
    saveDatabase(db); 
    res.json(task); 
});

module.exports = router;
