# Photo Upload Application

## Project Overview

The Photo Upload Application is a web-based application that allows users to upload and manage photos. It consists of a backend API built with Python using FastAPI and a frontend UI built with React. Both components are containerized using Docker for easy deployment and testing.

## Setup Instructions

### Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)


## API Documentation

### Backend API

The backend API is documented using Swagger UI and is accessible at `http://localhost:8000/docs` when the application is running. It provides endpoints for managing photos, including uploading and retrieving.

## Assumptions and Design Decisions

- **Containerization:** The application is containerized using Docker to ensure consistency in development, testing, and deployment environments.
  
- **Technology Stack:** Python with FastAPI is chosen for the backend due to its asynchronous capabilities and ease of use for building robust APIs. React is chosen for the frontend for its declarative component-based architecture and efficient rendering.

- **Persistence:** The backend uses SQLite for simplicity in this demonstration. For production, a more scalable database like PostgreSQL or MySQL would be recommended.

## Instructions on How to Run the Application Locally

To run the application locally using Docker, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/Gediontkd/photo-upload-app.git
   cd photo-upload-app
   ```

2. Build and start the Docker containers:
   ```sh
   docker-compose build
   docker-compose up
   ```

3. Access the application:
   - Frontend: Open `http://localhost:3000` in your web browser.
   - Backend: API documentation is available at `http://localhost:8000/docs`.

4. Stop the application:
   ```sh
   docker-compose down
   ```