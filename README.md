# Library Management System (LMS Pro)

Welcome to LMS Pro! This is a modern, full-stack application designed to make managing a library's books, members, and transactions effortless.

It features a robust Spring Boot backend coupled with a stunning, glassmorphic React frontend built with Vite.

## 🚀 Features
- **Stunning UI/UX:** A responsive, dark-mode, glassmorphism-inspired design for a premium user experience.
- **Book Inventory Management:** Admins can easily add and track books (with titles, authors, genres, and publication years).
- **Intelligent Browsing:** Users can browse books with real-time text search (by title/author) and dropdown filters for genre and year.
- **Member Management:** Admins have a dedicated dashboard to approve new pending registrations, view all active members, and remove users.
- **Self-Service Borrowing:** Users can browse the catalog and instantly borrow available books with a single click.
- **Borrowing Workflows:** Complete tracking of book borrowing and returning. Users can manage and return their own books. Admins can view overdue books and borrow/extend for users.
- **Secure Authentication & Authorization:** Robust user registration, JWT-based login system, Google OAuth2 Support, and method-level Role-Based Access Control (Admin/User).

## 🛠️ Tech Stack

### Frontend
- **React 18** (UI Library)
- **Vite** (Build Tool)
- **Axios** (API Client with Interceptors)
- **React Router** (Navigation)
- **Lucide React** (Icons)
- **Vanilla CSS** (Custom Glassmorphic Design System)

### Backend
- **Java 21**
- **Spring Boot 4.1.0** (REST API)
- **Spring Security & JWT** (Stateless authentication via JSON Web Tokens)
- **OAuth2 Client** (Google Login Integration)
- **Spring Data JPA** (Hibernate ORM mapping)
- **MySQL 8** (Relational Database)
- **Lombok** (Boilerplate code reduction)

## 📦 API Endpoints 

### Authentication (Public)
- `POST /auth/register`: Register a new user. New users are placed in a `PENDING` status.
- `POST /auth/login`: Authenticate a user and receive a JWT token.
- `GET /oauth2/authorization/google`: Start the Google OAuth2 login flow. Redirects to frontend with token upon success.

### Admin Operations (Secured - Requires `ADMIN` Role)
- `GET /admin/users`: Retrieves a full list of all registered users (ID, Name, Email, Role, Status).
- `DELETE /admin/users/{id}`: Removes a user from the system.
- `GET /admin/newRequest`: Retrieves a list of emails for users whose accounts are pending approval.
- `POST /admin/approveRequest?email={email}`: Approves a pending user account.

### Books (Secured)
- `POST /api/books/add`: Add a new book (Admin Only).
- `GET /api/books/available/{genre}`: Get a list of available books filtered by genre (User & Admin).

### Borrowing (Secured)
- `POST /api/borrowing/my-borrow/{bookId}`: Borrow a book for the currently logged-in user (User & Admin).
- `GET /api/borrowing/my-books`: Fetch the personal borrow history for the currently logged-in user (User & Admin).
- `POST /api/borrowing/return/{recordId}`: Mark a borrowed book as returned (User & Admin).
- `POST /api/borrowing/extend/{recordId}?extraDays={extraDays}`: Extend the due date of a borrowed book (User & Admin).
- `GET /api/borrowing/overdue`: Fetch a list of all currently overdue borrowing records (Admin Only).

## ⚙️ Getting Started

### Prerequisites
- Java JDK 21+ installed on your machine.
- Node.js (v18+) and npm installed.
- MySQL server running locally on port 3306.
- A Google Cloud Platform project with OAuth2 credentials (Client ID and Secret).

### 1. Database Setup
Ensure you have a MySQL database named `lms` created locally:
```sql
CREATE DATABASE lms;
```

### 2. Backend Configuration & Run
1. Update `backend/src/main/resources/application.properties` with your:
   - Local MySQL database credentials (`spring.datasource.username` and `password`).
   - Google OAuth2 credentials (`client-id` and `client-secret`).
2. Navigate into the backend directory and run the Spring Boot application:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
*The backend will start on `http://localhost:8080`. The database tables will be automatically generated, and sample books will be injected on startup!*

### 3. Frontend Configuration & Run
1. Navigate into the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
*The frontend will be available at `http://localhost:5173`.*
