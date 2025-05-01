📝 Task Manager App(HTML, CSS, Vanilla JS)

A simple Task Manager web application with user authentication built using Node.js, Express.js, and vanilla JavaScript (frontend and backend).

🚀 Features
User Login (with simple token generation) 
    "username": "testuser",
    "password": "testpass"

Create, View, and Manage personal tasks

Filter tasks (All, Completed, Incomplete)

Protected Routes using a simple middleware authentication

Persistent data stored locally (JSON file database)

🛠️ Project Structure

Task-Manager/
├── backend/
│   ├── server.js
│   ├── controllers/
│   │    └── middleware/
│   │          └── authMiddleware.js
│   └── utils/
│        └── database.js
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── package.json
└── README.md


📦 Installation

Clone the repository


git clone https://github.com/your-username/taskmanager.git

cd taskmanager

Install dependencies
npm install

Run the server
node backend/server.js

Access the app
Open your browser and visit:

http://localhost:5000

🔒 Authentication

Send a POST request to /api/auth/login with:

json:-
{
  "username": "testuser",
  "password": "testpass"
}
You will receive a token which you need to send in the header for protected routes (tasks).

Example:
Authorization: Bearer <token>

🧩 Technologies Used
Node.js

Express.js

Vanilla JavaScript (Frontend)

HTML5 / CSS3

JSON (for local database storage)
