# Scalable Task Management System with RBAC

This project is a full-stack Task Management System featuring JWT-based authentication and Role-Based Access Control (RBAC). It allows users to manage their own tasks while giving admins full visibility and control over all tasks in the system.

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js, MySQL, Sequelize ORM
- **Frontend:** React.js, Axios, CSS3
- **Security:** JSON Web Tokens (JWT), Bcrypt.js (Password Hashing)
- **Database:** MySQL

## ✨ Core Features

- **User Authentication:** Secure registration and login using JWT.
- **RBAC (Role-Based Access Control):** 
  - **Users:** Can create, view, and delete only their own tasks.
  - **Admins:** Can view all tasks across the system and delete any task.
- **RESTful API:** Clean API versioning.
- **Responsive UI:** A modern dashboard built with React.

---

## 🛠️ Installation & Setup

### 1. Prerequisites
- Node.js installed
- MySQL Server running

### 2. Backend Setup
1. Navigate to the backend folder:
   cd backend

Install dependencies:

npm install

Create a .env file in the backend directory:

PORT=5000
DB_NAME=task_db
DB_USER=root
DB_PASS=your_mysql_password
DB_HOST=localhost
JWT_SECRET=your_secret_key

Create the database in MySQL:

CREATE DATABASE task_db;
Start the server:

npm start


3. Frontend Setup
Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the React app:

npm start


📑 API Endpoints

Auth

POST /api/v1/auth/register - Register a new user/admin
POST /api/v1/auth/login - Login to get JWT token

Tasks (Protected Routes)

GET /api/v1/tasks - Fetch tasks (Role-dependent)
POST /api/v1/tasks - Create a new task
DELETE /api/v1/tasks/:id - Delete a task (Owner or Admin only)
