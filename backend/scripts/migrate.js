import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../src/db/pool.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, "..", "sql", "schema.sql");

async function migrate() {
  const sql = fs.readFileSync(schemaPath, "utf8");
  await pool.query(sql);
  console.log("Migrasi database berhasil.");
}

migrate()
  .catch((err) => {
    console.error("Migrasi gagal:", err.message);
    process.exit(1);
  })
  .finally(() => pool.end());
