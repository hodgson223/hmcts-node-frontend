# Task Gateway API

This project is an **Express.js API gateway** that forwards task-related
requests to a **Spring Boot backend service**. It also includes
**Swagger documentation** for viewing and testing available API
endpoints.

## Features

-   Fetch all tasks
-   Create a new task
-   Delete a task by ID
-   API health check endpoint
-   Interactive Swagger documentation

## Technologies Used

-   Node.js
-   Express.js
-   Axios
-   CORS
-   Swagger UI Express
-   Swagger JSDoc

## Project Structure

    .
    ├── server.js
    ├── package.json
    └── README.md

## Prerequisites

Before running this project, ensure the following are installed:

-   Node.js
-   npm
-   A running Spring Boot task service at:

```{=html}
<!-- -->
```
    http://localhost:8080

The Express gateway runs at:

    http://localhost:5000

## Installation

Clone the repository and install dependencies:

``` bash
npm install
```

## Running the Application

Start the Express server:

``` bash
node server.js
```

Expected output:

    🚀 Express API running on http://localhost:5000
    ➡️ Forwarding requests to Spring Boot at http://localhost:8080

## API Endpoints

### Get All Tasks

**GET /tasks**

Fetches all tasks from the Spring Boot service.

Example response:

``` json
{
  "tasks": [
    {
      "id": 1,
      "title": "Finish assignment",
      "description": "Complete Swagger documentation",
      "status": "PENDING",
      "dueDate": "2026-03-20"
    }
  ]
}
```

### Create a Task

**POST /tasks**

Creates a new task through the Spring Boot service.

Example request body:

``` json
{
  "title": "Finish assignment",
  "description": "Complete API gateway work",
  "status": "PENDING",
  "dueDate": "2026-03-20"
}
```

Required fields:

-   title
-   status
-   dueDate

### Delete a Task

**DELETE /tasks/:id**

Deletes a task by ID through the Spring Boot service.

### Health Check

**GET /health**

Returns the current status of the Express gateway.

Example response:

``` json
{
  "status": "running",
  "gateway": "express",
  "taskService": "http://localhost:8080"
}
```

## Swagger API Documentation

Swagger UI is available at:

    http://localhost:5000/api-docs

This provides interactive documentation where you can test the API
endpoints directly from the browser.

## How It Works

The Express gateway acts as a middleware layer between the client and
the Spring Boot backend.

1.  Client sends a request to the Express API.
2.  Express forwards the request to the Spring Boot task service using
    Axios.
3.  Spring Boot processes the request and returns a response.
4.  Express returns the response to the client.

## Error Handling

The API includes basic error handling for:

-   Missing required fields when creating tasks
-   Task not found when deleting
-   Internal server errors when the backend service fails

## Installing Dependencies

``` bash
npm install express cors axios swagger-ui-express swagger-jsdoc
```

## Author

Developed as part of a project and HMCTS application. Demonstrating API gateway
development, REST integration, and Swagger documentation using
Express.js and Spring Boot.
