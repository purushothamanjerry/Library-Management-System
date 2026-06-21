# Library Management System

Welcome to the Library Management System! This is a modern, full-stack application designed to make managing a library's books, members, and transactions effortless.

## 🚀 Features
- **Book Management:** Add, update, and remove books from the library catalog.
- **Member Management:** Register and manage library members.
- **Transactions:** Track book borrowing, due dates, and calculate fines.
- **Secure Authentication & Authorization:** Robust user registration, JWT-based login system, and Role-Based Access Control (Admin/User).
- **Admin Workflows:** Admins can review and approve pending account registrations before users gain access.

## 🛠️ Tech Stack (Backend)
- **Java 21**
- **Spring Boot 4.1.0** (REST API)
- **Spring Security & JWT** (Stateless authentication via JSON Web Tokens)
- **Spring Data JPA** (Hibernate 7 ORM mapping)
- **MySQL 8** (Relational Database)
- **Lombok** (Boilerplate code reduction)

## 📦 API Endpoints 

### Authentication (Public)
- `GET /auth/check`: Health check endpoint to verify the server is running.
- `POST /auth/register`: Register a new user. New users are placed in a `PENDING` status.
- `POST /auth/login`: Authenticate a user and receive a JWT token (valid for 15 minutes) if the account is approved.

### Admin Operations (Secured - Requires `ADMIN` Role)
*Requires `Authorization: Bearer <token>` header.*
- `GET /admin/newRequest`: Retrieves a list of emails for users whose accounts are pending approval.
- `POST /admin/approveRequest?email={email}`: Approves a pending user account.

## ⚙️ Getting Started

### Prerequisites
- Java JDK 21+ installed on your machine.
- Maven installed.
- MySQL server running locally on port 3306.

### Setup Instructions
1. **Database Setup:** 
   Ensure you have a MySQL database named `lms` created locally:
   ```sql
   CREATE DATABASE lms;
   ```
2. **Configuration:** 
   Update `backend/src/main/resources/application.properties` with your local MySQL database credentials (url, username, password).
3. **Run the Backend:**
   Navigate into the backend directory and run the Spring Boot application:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080` and the database tables will be automatically generated!
