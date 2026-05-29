import pool from "../db/pool.js";
import { checkDatabaseConnection } from "../db/pool.js";

export async function isDatabaseAvailable() {
  return checkDatabaseConnection();
}

export async function countGoldPrices() {
  const { rows } = await pool.query(`SELECT COUNT(*)::int AS count FROM gold_prices`);
  return rows[0]?.count ?? 0;
}

function formatPriceDate(value) {
  if (typeof value === "string") {
    return value.slice(0, 10);
  }
  const d = new Date(value);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function mapRowToEntry(row) {
  const entry = {
    date: formatPriceDate(row.price_date),
    price: Number(row.price_per_gram),
    currency: row.currency,
    source: row.source,
  };
  if (row.open_price != null) entry.openPrice = Number(row.open_price);
  if (row.high_price != null) entry.highPrice = Number(row.high_price);
  if (row.low_price != null) entry.lowPrice = Number(row.low_price);
  if (row.close_price != null) entry.closePrice = Number(row.close_price);
  if (row.volume != null) entry.volume = Number(row.volume);
  if (row.daily_return != null) entry.dailyReturn = Number(row.daily_return);
  return entry;
}

export async function findAllGoldPrices() {
  const { rows } = await pool.query(
    `SELECT price_date, price_per_gram, currency,
            open_price, high_price, low_price, close_price,
            source, volume, daily_return
     FROM gold_prices
     ORDER BY price_date ASC`
  );
  return rows.map(mapRowToEntry);
}

export async function findLatestGoldPrice() {
  const { rows } = await pool.query(
    `SELECT price_date, price_per_gram, currency,
            open_price, high_price, low_price, close_price,
            source, volume, daily_return
     FROM gold_prices
     ORDER BY price_date DESC
     LIMIT 1`
  );
  return rows[0] ? mapRowToEntry(rows[0]) : null;
}

export async function findRecentGoldPrices(limit = 30) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 30, 5000));
  const { rows } = await pool.query(
    `SELECT price_date, price_per_gram, currency,
            open_price, high_price, low_price, close_price,
            source, volume, daily_return
     FROM (
       SELECT * FROM gold_prices ORDER BY price_date DESC LIMIT $1
     ) recent
     ORDER BY price_date ASC`,
    [safeLimit]
  );
  return rows.map(mapRowToEntry);
}

export async function findGoldPricesInRange({ startDate, endDate, limit } = {}) {
  const conditions = [];
  const params = [];
  let paramIndex = 1;

  if (startDate) {
    conditions.push(`price_date >= $${paramIndex++}`);
    params.push(startDate);
  }
  if (endDate) {
    conditions.push(`price_date <= $${paramIndex++}`);
    params.push(endDate);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const { rows } = await pool.query(
    `SELECT price_date, price_per_gram, currency,
            open_price, high_price, low_price, close_price,
            source, volume, daily_return
     FROM gold_prices
     ${where}
     ORDER BY price_date ASC`,
    params
  );

  let entries = rows.map(mapRowToEntry);
  if (limit) {
    const safeLimit = Math.max(1, Math.min(Number(limit), 5000));
    entries = entries.slice(-safeLimit);
  }
  return entries;
}

export async function findGoldStatsLastNDays(days = 7) {
  const safeDays = Math.max(1, Math.min(Number(days) || 7, 365));
  const { rows } = await pool.query(
    `SELECT price_date, price_per_gram, currency,
            open_price, high_price, low_price, close_price,
            source, volume, daily_return
     FROM gold_prices
     ORDER BY price_date DESC
     LIMIT $1`,
    [safeDays]
  );
  return rows.map(mapRowToEntry).reverse();
}
