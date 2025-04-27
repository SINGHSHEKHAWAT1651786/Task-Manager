const express = require('express');
const path = require('path');
const { getDatabase, writeData } = require('./utils/database');
const authenticate = require('./controllers/middleware/authMiddleware');

const app = express();
const port = 5000;

app.use(express.json());

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Root route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Login API (mock example)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const db = getDatabase();
  const user = db.users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate and assign token
  const token = Math.random().toString(36).substring(2, 15); 
  user.token = token;
  writeData(db);

  res.json({ token });
});

// Protected route for tasks (GET)
app.get('/api/tasks', authenticate, (req, res) => {
  const db = getDatabase();
  let tasks = db.tasks.filter(task => task.user === req.user.username);

  // Sort tasks by newest first (higher id first)
  tasks = tasks.sort((a, b) => b.id - a.id);

  res.json(tasks);
});

// Protected route for tasks (POST)
app.post('/api/tasks', authenticate, (req, res) => {
  const { title } = req.body;
  const db = getDatabase();

  const newTask = {
    id: db.tasks.length > 0 ? db.tasks[db.tasks.length - 1].id + 1 : 1, 
    title,
    completed: false,
    user: req.user.username
  };

  db.tasks.push(newTask);
  writeData(db);

  res.status(201).json(newTask);
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
