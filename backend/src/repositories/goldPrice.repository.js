import pool from "../db/pool.js";
import { checkDatabaseConnection } from "../db/pool.js";

export async function isDatabaseAvailable() {
  return checkDatabaseConnection();
}

export async function countGoldPrices() {
  const { rows } = await pool.query(`SELECT COUNT(*)::int AS count FROM gold_prices`);
  return rows[0]?.count ?? 0;
}

export async function findAllGoldPrices() {
  const { rows } = await pool.query(
    `SELECT price_date, price_per_gram, currency,
            open_price, high_price, low_price, close_price, source
     FROM gold_prices
     ORDER BY price_date ASC`
  );
  return rows.map(mapRowToEntry);
}

export async function findLatestGoldPrice() {
  const { rows } = await pool.query(
    `SELECT price_date, price_per_gram, currency,
            open_price, high_price, low_price, close_price, source
     FROM gold_prices
     ORDER BY price_date DESC
     LIMIT 1`
  );
  return rows[0] ? mapRowToEntry(rows[0]) : null;
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
  return entry;
}
