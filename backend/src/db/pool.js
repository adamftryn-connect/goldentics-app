import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL tidak diset. Fitur database tidak aktif; gunakan fallback file."
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function checkDatabaseConnection() {
  if (!process.env.DATABASE_URL) {
    return false;
  }
  try {
    await pool.query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}

export default pool;
