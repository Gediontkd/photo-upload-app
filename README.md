# Photo Upload Application

This project is a full-stack application for uploading, displaying, and managing photos with a backend built using FastAPI and a frontend built with React. This application consists of a backend service and a frontend service, both of which can be run using Docker. This guide will help you set up and run the application for testing purposes.

## Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```sh
git clone https://github.com/your-username/photo-upload-app.git
cd photo-upload-app
```

### 2. Build the Docker Containers

Navigate to the root of the project directory and build the Docker containers using Docker Compose:

```sh
docker-compose build
```

### 2. Run the Docker Containers

After building the containers, start them with:

```sh
docker-compose up
```

This command will start both the backend and frontend services. Please note that the frontend might take some time to build and start initially.

### 5. Access the Application

- **Frontend:** Open your web browser and navigate to `http://localhost:3000` to access the frontend application.
- **Backend:** The backend service should be running on `http://localhost:8000`. You can interact with the backend API using tools like `curl` or Postman.

### 6. Stopping the Application

To stop the running Docker containers, press `CTRL+C` in the terminal where the containers are running, or run:

```sh
docker-compose down
```

## Testing the Application

### Frontend

To test the frontend:

1. Open `http://localhost:3000` in your web browser.
2. Interact with the UI and ensure that it behaves as expected.

### Backend

To test the backend:

1. Access the API documentation at `http://localhost:8000/docs`.