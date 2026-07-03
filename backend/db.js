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
	host: process.env.DB_HOST || "127.0.0.1",
	port: process.env.DB_PORT || 3306,  
	  user: process.env.DB_USER,
	  password: process.env.DB_PASSWORD,
	  database: process.env.DB_NAME,
	  waitForConnections: true,
	  connectionLimit: 10,
	  dateStrings: true
});
