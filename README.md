# Community Library Management System

## Project Description

The Community Library Management System is a web-based application developed to help manage the daily activities of a community library.

The system allows library staff to manage books, register members, and record book borrowing and returning transactions. It provides a simple and user-friendly interface designed to make library management easier and more organised.

## Technologies Used

### Frontend
- React.js
- JavaScript
- CSS
- HTML

### Backend
- Node.js
- Express.js

### Database
- MySQL

## Project Structure

```text
Community-Library-Management-System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Main Features

- **Dashboard:** Displays an overview of library information.
- **Book Management:** Allows users to add, view, and delete books.
- **Member Management:** Allows users to register and view library members.
- **Transaction Management:** Records book borrowing and returning activities.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

### 2. Set Up the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Set Up the Backend

Open another terminal:

```bash
cd backend
npm install
node server.js
```

### 4. Database Setup

Create a MySQL database named:

`community_library`

Create the required tables for books, members, and transactions.

Configure your database connection using a local `.env` file. Do not upload your database password to GitHub.

## Project Purpose

This project demonstrates the use of modern web development technologies to develop a database-driven library management application.

## Author

**Student Name:** [Your Full Name]

**Programme:** Bachelor of Science in Information Technology

**Institution:** Limkokwing University of Creative Technology
