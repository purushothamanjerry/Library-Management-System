# Library Management System

Welcome to the Library Management System! This is a modern, full-stack application designed to make managing a library's books, members, and transactions effortless.

## 🚀 Features
- **Book Management:** Add, update, and remove books from the library catalog.
- **Member Management:** Register and manage library members.
- **Transactions:** Track book borrowing, due dates, and calculate fines.
- **Secure Authentication:** Robust user registration and login system.

## 🛠️ Tech Stack (Backend)
- **Java 21**
- **Spring Boot 4.1.0** (REST API)
- **Spring Security** (Stateless authentication configuration)
- **Spring Data JPA** (Hibernate 7 ORM mapping)
- **MySQL 8** (Relational Database)
- **Lombok** (Boilerplate code reduction)

## 📦 API Endpoints 

The backend currently exposes the following authentication endpoints:

- `GET /auth/check`: Health check endpoint to verify the server is running.
- `POST /auth/register`: Register a new user. Accepts a JSON payload with `name`, `email`, and `password`.
- `POST /auth/login`: Authenticate a user. Accepts a JSON payload with `email` and `password`.

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
