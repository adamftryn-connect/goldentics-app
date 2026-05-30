import pool from "./pool.js";

const TRANSIENT_DB_CODES = new Set([
  "ECONNRESET",
  "ECONNREFUSED",
  "ETIMEDOUT",
  "57P01",
  "57P03",
  "08006",
  "08001",
  "53300",
]);

export function isTransientDbError(err) {
  if (!err) return false;
  if (TRANSIENT_DB_CODES.has(err.code)) return true;
  const msg = String(err.message ?? "").toLowerCase();
  return (
    msg.includes("connection terminated") ||
    msg.includes("connection reset") ||
    msg.includes("socket hang up") ||
    msg.includes("timeout")
  );
}

/** Query dengan retry ringan untuk koneksi DB yang belum stabil (mis. setelah restart). */
export async function queryWithRetry(text, params, retries = 2) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await pool.query(text, params);
    } catch (err) {
      lastErr = err;
      if (attempt < retries && isTransientDbError(err)) {
        await new Promise((r) => setTimeout(r, 150 * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}
