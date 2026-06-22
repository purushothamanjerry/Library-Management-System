# Library Management System

Welcome to the Library Management System! This is a modern, full-stack application designed to make managing a library's books, members, and transactions effortless.

## 🚀 Features
- **Book Inventory Management:** Add new books with genre tracking, and automatically manage available versus total copies.
- **Member Management:** Register and manage library members.
- **Borrowing Workflows:** Complete tracking of book borrowing and returning, with support for extending due dates and identifying overdue books.
- **Secure Authentication & Authorization:** Robust user registration, JWT-based login system, Google OAuth2 Support, and method-level Role-Based Access Control (Admin/User).
- **Admin Workflows:** Admins can review and approve pending account registrations before users gain access.

## 🛠️ Tech Stack (Backend)
- **Java 21**
- **Spring Boot 4.1.0** (REST API)
- **Spring Security & JWT** (Stateless authentication via JSON Web Tokens)
- **OAuth2 Client** (Google Login Integration)
- **Spring Data JPA** (Hibernate 7 ORM mapping)
- **MySQL 8** (Relational Database)
- **Lombok** (Boilerplate code reduction)

## 📦 API Endpoints 

### Authentication (Public)
- `GET /auth/check`: Health check endpoint to verify the server is running.
- `POST /auth/register`: Register a new user. New users are placed in a `PENDING` status.
- `POST /auth/login`: Authenticate a user and receive a JWT token (valid for 15 minutes) if the account is approved.
- `GET /oauth2/authorization/google`: Start the Google OAuth2 login flow. Redirects to frontend with token upon success.

### Admin Operations (Secured - Requires `ADMIN` Role)
*Requires `Authorization: Bearer <token>` header.*
- `GET /admin/newRequest`: Retrieves a list of emails for users whose accounts are pending approval.
- `POST /admin/approveRequest?email={email}`: Approves a pending user account.

### Books (Secured)
*Requires `Authorization: Bearer <token>` header.*
- `POST /api/books/add`: Add a new book (Admin Only).
- `GET /api/books/available/{genre}`: Get a list of available books filtered by genre (User & Admin).

### Borrowing (Secured)
*Requires `Authorization: Bearer <token>` header.*
- `POST /api/borrowing/borrow`: Borrow a book for a user (Admin Only).
- `POST /api/borrowing/return/{recordId}`: Mark a borrowed book as returned (User & Admin).
- `POST /api/borrowing/extend/{recordId}?extraDays={extraDays}`: Extend the due date of a borrowed book (User & Admin).
- `GET /api/borrowing/overdue`: Fetch a list of all currently overdue borrowing records (Admin Only).

## ⚙️ Getting Started

### Prerequisites
- Java JDK 21+ installed on your machine.
- Maven installed.
- MySQL server running locally on port 3306.
- A Google Cloud Platform project with OAuth2 credentials (Client ID and Secret).

### Setup Instructions
1. **Database Setup:** 
   Ensure you have a MySQL database named `lms` created locally:
   ```sql
   CREATE DATABASE lms;
   ```
2. **Configuration:** 
   Update `backend/src/main/resources/application.properties` with your:
   - Local MySQL database credentials (url, username, password).
   - Google OAuth2 Client ID and Client Secret (`spring.security.oauth2.client.registration.google.client-id` and `client-secret`).
3. **Run the Backend:**
   Navigate into the backend directory and run the Spring Boot application:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080` and the database tables will be automatically generated!
