import express from "express";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

app.use(express.json());

function isValidId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0;
}

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Lab E3 backend is running",
    student: process.env.STUDENT_NAME || "Unknown student"
  });
});

app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS database_connection_test");

    res.json({
      status: "ok",
      message: "Database connection works",
      result: rows[0]
    });
  } catch (error) {
    console.error("Database test failed:", error);
    res.status(500).json({
      status: "error",
      message: "Database connection failed"
    });
  }
});

app.get("/sightings", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, observer_name, sighting_date, location_name, health_status, notes, created_at, updated_at
       FROM sightings
       ORDER BY id`
    );

    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch sightings:", error);
    res.status(500).json({ error: "Failed to fetch sightings" });
  }
});

app.get("/sightings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ error: "Invalid sighting ID" });
    }

    const [rows] = await pool.query(
      `SELECT id, observer_name, sighting_date, location_name, health_status, notes, created_at, updated_at
       FROM sightings
       WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Sighting not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Failed to fetch sighting:", error);
    res.status(500).json({ error: "Failed to fetch sighting" });
  }
});

app.post("/sightings", async (req, res) => {
  try {
    const {
      observer_name,
      sighting_date,
      location_name,
      health_status = "Unknown",
      notes = null
    } = req.body;

    if (!observer_name || !sighting_date || !location_name) {
      return res.status(400).json({
        error: "observer_name, sighting_date, and location_name are required"
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO sightings
       (observer_name, sighting_date, location_name, health_status, notes)
       VALUES (?, ?, ?, ?, ?)`,
      [observer_name, sighting_date, location_name, health_status, notes]
    );

    res.status(201).json({
      message: "Sighting created",
      id: result.insertId
    });
  } catch (error) {
    console.error("Failed to create sighting:", error);
    res.status(500).json({ error: "Failed to create sighting" });
  }
});

app.put("/sightings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ error: "Invalid sighting ID" });
    }

    const {
      observer_name,
      sighting_date,
      location_name,
      health_status = "Unknown",
      notes = null
    } = req.body;

    if (!observer_name || !sighting_date || !location_name) {
      return res.status(400).json({
        error: "observer_name, sighting_date, and location_name are required"
      });
    }

    const [result] = await pool.execute(
      `UPDATE sightings
       SET observer_name = ?,
           sighting_date = ?,
           location_name = ?,
           health_status = ?,
           notes = ?
       WHERE id = ?`,
      [observer_name, sighting_date, location_name, health_status, notes, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Sighting not found" });
    }

    res.json({ message: "Sighting updated" });
  } catch (error) {
    console.error("Failed to update sighting:", error);
    res.status(500).json({ error: "Failed to update sighting" });
  }
});

app.delete("/sightings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ error: "Invalid sighting ID" });
    }

    const [result] = await pool.execute(
      "DELETE FROM sightings WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Sighting not found" });
    }

    res.json({ message: "Sighting deleted" });
  } catch (error) {
    console.error("Failed to delete sighting:", error);
    res.status(500).json({ error: "Failed to delete sighting" });
  }
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