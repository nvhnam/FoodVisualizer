import createPool from "mysql2";
import { config as dotenvConfig } from "dotenv";
import mysql from "mysql2/promise";

dotenvConfig();

const dbPoolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 1,
  queueLimit: 0,
};

if (process.env.PORT === "3307") {
  dbPoolConfig.port = "3307";
}

const dbPool = mysql.createPool(dbPoolConfig);

export { dbPool };
