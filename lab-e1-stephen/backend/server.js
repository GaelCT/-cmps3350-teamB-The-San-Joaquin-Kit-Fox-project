import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Hello from the Node/Express backend",
    student: process.env.STUDENT_NAME || "Unknown student"
  });
});

app.get("/about", (req, res) => {
  res.json({
    app: "Kit Fox Tracker",
    backend: "Node.js and Express",
    purpose: "This API will later provide CRUD access to sighting records.",
    publicApiUrl: process.env.PUBLIC_API_URL || "Not configured"
  });
});

app.get("/version", (req, res) => {
  res.json({
    lab: "Lab E1",
    version: "1.0.0",
    database: "not connected yet"
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    path: req.path
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Backend API running on http://${HOST}:${PORT}`);
});