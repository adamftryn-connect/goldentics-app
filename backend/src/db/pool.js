import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL tidak diset. Fitur database tidak aktif; gunakan fallback file."
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 30_000,
});

pool.on("error", (err) => {
  console.error("[db pool] koneksi idle error:", err.message);
});

export async function warmupDatabase() {
  if (!process.env.DATABASE_URL) {
    return false;
  }
  await pool.query("SELECT 1");
  return true;
}

export async function checkDatabaseConnection() {
  if (!process.env.DATABASE_URL) {
    return false;
  }
  try {
    await warmupDatabase();
    return true;
  } catch {
    return false;
  }
}

export default pool;
