/**
 * entry point server backend
 * Port default: 5000 
 */
import "dotenv/config";
import app from "./app.js";
import { warmupDatabase } from "./db/pool.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Goldentics API berjalan di http://localhost:${PORT}`);
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL tidak diset — login/register membutuhkan PostgreSQL.");
    return;
  }
  try {
    await warmupDatabase();
    console.log("Database: terhubung dan siap");
  } catch (err) {
    console.warn("Database: warmup gagal —", err.message);
  }
});
