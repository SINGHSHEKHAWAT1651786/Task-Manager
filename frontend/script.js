let token = '';
let tasks = [];
// Function to handle login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            token = data.token;
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('taskSection').style.display = 'block';
            fetchTasks();
        } else {
            alert('Login failed');
        }
    });
}

function fetchTasks() {
    fetch('http://localhost:5000/api/tasks', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => {
        // Sort tasks newest first (highest id first)
        tasks = data.sort((a, b) => b.id - a.id);
        displayTasks('all');
    });
}

function addTask() {
    const title = document.getElementById('taskInput').value;
    if (!title) return;

    fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ title })
    })
    .then(res => res.json())
    .then(newTask => {
        // Add new task to the top
        tasks.unshift(newTask);
        displayTasks('all');
        document.getElementById('taskInput').value = '';
    });
}

function displayTasks(filter) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item ' + (task.completed ? 'completed' : '');
        taskItem.innerHTML = `
            ${task.title}
            <button onclick="toggleComplete(${task.id})">✅</button>
            <button onclick="deleteTask(${task.id})">🗑️</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    displayTasks('all');
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks('all');
}

function filterTasks(type) {
    displayTasks(type);
}
