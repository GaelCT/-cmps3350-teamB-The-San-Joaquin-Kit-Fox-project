import express from "express";
import dotenv from "dotenv";
import { pool } from "./db.js";
import morgan from "morgan";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

const SIGHTING_FIELDS = `
  id,
  observer_name,
  sighting_date,
  location_name,
  latitude,
  longitude,
  fox_count,
  health_status,
  notes,
  created_at,
  updated_at
`;

app.use(morgan("combined"));
app.use(express.json());

function isValidId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0;
}

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function requiredText(body, fieldName) {
  const value = body[fieldName];

  if (typeof value !== "string" || value.trim() === "") {
    throw createHttpError(400, `${fieldName} is required`);
  }

  return value.trim();
}

function optionalText(value, defaultValue = null) {
  if (value === undefined || value === null || String(value).trim() === "") {
    return defaultValue;
  }

  return String(value).trim();
}

function optionalNumberInRange(value, fieldName, min, max) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const number = Number(value);

  if (!Number.isFinite(number) || number < min || number > max) {
    throw createHttpError(
      400,
      `${fieldName} must be a number between ${min} and ${max}`
    );
  }

  return number;
}

function optionalPositiveInteger(value, fieldName) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    throw createHttpError(400, `${fieldName} must be a positive integer`);
  }

  return number;
}

function readSightingBody(body) {
  return {
    observer_name: requiredText(body, "observer_name"),
    sighting_date: requiredText(body, "sighting_date"),
    location_name: requiredText(body, "location_name"),
    latitude: optionalNumberInRange(body.latitude, "latitude", -90, 90),
    longitude: optionalNumberInRange(body.longitude, "longitude", -180, 180),
    fox_count: optionalPositiveInteger(body.fox_count, "fox_count"),
    health_status: optionalText(body.health_status, "Unknown"),
    notes: optionalText(body.notes, null)
  };
}

function sendError(res, error, fallbackMessage) {
  if (error.statusCode) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  console.error(fallbackMessage, error);
  return res.status(500).json({ error: fallbackMessage });
}

async function getSightingById(id) {
  const [rows] = await pool.query(
    `SELECT ${SIGHTING_FIELDS}
     FROM sightings
     WHERE id = ?`,
    [id]
  );

  return rows[0] || null;
}

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Kit Fox Tracker backend is running",
    student: process.env.STUDENT_NAME || "Unknown student",
    public_api_url: process.env.PUBLIC_API_URL || null
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
      `SELECT ${SIGHTING_FIELDS}
       FROM sightings
       ORDER BY id`
    );

    res.json(rows);
  } catch (error) {
    sendError(res, error, "Failed to fetch sightings");
  }
});

app.get("/sightings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ error: "Invalid sighting ID" });
    }

    const sighting = await getSightingById(id);

    if (!sighting) {
      return res.status(404).json({ error: "Sighting not found" });
    }

    res.json(sighting);
  } catch (error) {
    sendError(res, error, "Failed to fetch sighting");
  }
});

app.post("/sightings", async (req, res) => {
  try {
    const sighting = readSightingBody(req.body);

    const [result] = await pool.execute(
      `INSERT INTO sightings
       (
         observer_name,
         sighting_date,
         location_name,
         latitude,
         longitude,
         fox_count,
         health_status,
         notes
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sighting.observer_name,
        sighting.sighting_date,
        sighting.location_name,
        sighting.latitude,
        sighting.longitude,
        sighting.fox_count,
        sighting.health_status,
        sighting.notes
      ]
    );

    const createdSighting = await getSightingById(result.insertId);

    res.status(201).json({
      message: "Sighting created",
      id: result.insertId,
      sighting: createdSighting
    });
  } catch (error) {
    sendError(res, error, "Failed to create sighting");
  }
});

app.put("/sightings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ error: "Invalid sighting ID" });
    }

    const sighting = readSightingBody(req.body);

    const [result] = await pool.execute(
      `UPDATE sightings
       SET observer_name = ?,
           sighting_date = ?,
           location_name = ?,
           latitude = ?,
           longitude = ?,
           fox_count = ?,
           health_status = ?,
           notes = ?
       WHERE id = ?`,
      [
        sighting.observer_name,
        sighting.sighting_date,
        sighting.location_name,
        sighting.latitude,
        sighting.longitude,
        sighting.fox_count,
        sighting.health_status,
        sighting.notes,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Sighting not found" });
    }

    const updatedSighting = await getSightingById(id);

    res.json({
      message: "Sighting updated",
      sighting: updatedSighting
    });
  } catch (error) {
    sendError(res, error, "Failed to update sighting");
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
    sendError(res, error, "Failed to delete sighting");
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