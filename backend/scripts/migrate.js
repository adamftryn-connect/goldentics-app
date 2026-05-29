import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../src/db/pool.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlDir = path.join(__dirname, "..", "sql");

async function migrate() {
  const files = fs
    .readdirSync(sqlDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(sqlDir, file), "utf8");
    await pool.query(sql);
    console.log(`Migrasi OK: ${file}`);
  }
  console.log("Migrasi database berhasil.");
}

migrate()
  .catch((err) => {
    console.error("Migrasi gagal:", err.message);
    process.exit(1);
  })
  .finally(() => pool.end());
