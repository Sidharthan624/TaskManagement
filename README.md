# Task Management Project

This is a full-stack Task Management application that allows users to add, view, update, and delete tasks. The project is built with a React frontend and Node.js/Express backend.

## Features

- Add tasks with titles and optional descriptions.
- Mark tasks as complete/incomplete.
- Delete tasks.
- Persist tasks in a database.
- JWT-based authentication.
- Responsive UI with Tailwind CSS.
- Toast notifications for user feedback.

## Project Structure


.
├── backend      # Contains the Node.js/Express API and database models
└── frontend     # Contains the React application for the Task Manager UI
Prerequisites
Before running this project, ensure you have the following installed on your machine:

Node.js (v14 or higher)
npm
MongoDB (local or cloud-based, like MongoDB Atlas)
Getting Started
1. Clone the Repository

git clone https://github.com/Sidharthan624/TaskManagement.git
cd task-management
2. Install Dependencies
Backend (Navigate to the backend folder):

cd backend
npm install
Frontend (Navigate to the frontend folder):

cd ../frontend
npm install
3. Environment Variables
Create a .env file in the backend directory with the following:


PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
4. Running the Project
To run both the frontend and backend servers concurrently, use the following command:


npm run dev
Frontend will be served at: http://localhost:3000
Backend will be served at: http://localhost:5000
5. Testing the Application
Navigate to http://localhost:3000.
Add tasks by providing a title and optional description.
Mark tasks as completed or delete them.
Project Scripts
Start Frontend: npm run frontend
Start Backend: npm run backend
Run Both Frontend & Backend: npm run dev
API Endpoints
Task Endpoints:
GET /api/tasks - Retrieve all tasks
POST /api/tasks - Add a new task
PATCH /api/tasks/:id - Update task completion status
DELETE /api/tasks/:id - Delete a task
Dependencies
Backend:
Express
Mongoose
bcryptjs
jsonwebtoken
dotenv
cors
Frontend:
React
Axios
react-toastify
Tailwind CSS
