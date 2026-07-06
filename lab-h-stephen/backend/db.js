import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];

for (const name of requiredEnvVars) {
  if (!process.env[name]) {
    console.warn(`Missing environment variable: ${name}`);
  }
}

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true
});