const express = require("express");
const cors = require("cors");
const axios = require("axios");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");


const app = express();

// Port for Express API
const PORT = 5000;

// Spring Boot service location
const TASK_SERVICE_URL = "http://localhost:8080";

app.use(cors());
app.use(express.json());

/**
 * Swagger config
 */
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Gateway API",
      version: "1.0.0",
      description: "Express gateway API for forwarding task requests to Spring Boot"
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ]
  },
  apis: [__filename]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ------------------------ ROUTES ------------------------

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Fetches tasks from the Spring Boot service.
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error fetching tasks
 */

// GET /tasks → fetch tasks from Spring Boot
app.get("/tasks", async (req, res) => {
  try {
    const response = await axios.get(`${TASK_SERVICE_URL}/internal/tasks`);

    res.status(200).json({
      tasks: response.data
    });

  } catch (err) {
    console.error("Error fetching tasks:", err.message);

    res.status(500).json({
      error: "Server error fetching tasks"
    });
  }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Sends a new task to the Spring Boot service.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - status
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: Finish assignment
 *               description:
 *                 type: string
 *                 example: Complete the API gateway work
 *               status:
 *                 type: string
 *                 example: PENDING
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-03-20
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error saving task
 */

// POST /tasks → create task via Spring Boot
app.post("/tasks", async (req, res) => {

  const { title, description, status, dueDate } = req.body;

  if (!title || !status || !dueDate) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  try {

    const response = await axios.post(`${TASK_SERVICE_URL}/internal/tasks`, {
      title,
      description,
      status,
      dueDate
    });

    res.status(201).json({
      message: "Task created successfully",
      task: response.data
    });

  } catch (err) {

    console.error("Error saving task:", err.message);

    res.status(500).json({
      error: "Server error saving task"
    });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task from the Spring Boot service.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error deleting task
 */

//  DELETE /tasks delete task via Spring Boot

app.delete("/tasks/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const response = await axios.delete(
      `${TASK_SERVICE_URL}/internal/tasks/${id}`
    );

    res.status(200).json({
      message: "Task deleted successfully",
      task: response.data
    });

  } catch (err) {

    // If Spring Boot returns 404
    if (err.response && err.response.status === 404) {
      return res.status(404).json({
        error: `Task with id ${id} not found`
      });
    }

    console.error("Error deleting task:", err.message);

    res.status(500).json({
      error: "Server error deleting task"
    });

  }

});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: API health check
 *     description: Returns the status of the Express gateway and the Spring Boot service.
 *     responses:
 *       200:
 *         description: API is running
 */

// Optional health check
app.get("/health", (req, res) => {
  res.json({
    status: "running",
    gateway: "express",
    taskService: TASK_SERVICE_URL
  });
});

// ------------------------ START SERVER ------------------------

app.listen(PORT, () => {
  console.log(`🚀 Express API running on http://localhost:${PORT}`);
  console.log(`➡️  Forwarding requests to Spring Boot at ${TASK_SERVICE_URL}`);
});