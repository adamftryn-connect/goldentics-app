import "dotenv/config";
import { goldHistoricalData } from "../src/data/data-gold.js";
import pool from "../src/db/pool.js";

async function seedGoldPrices() {
  let inserted = 0;

  for (const row of goldHistoricalData) {
    const result = await pool.query(
      `INSERT INTO gold_prices (
        price_date, price_per_gram, currency,
        open_price, high_price, low_price, close_price, source
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (price_date) DO NOTHING`,
      [
        row.date,
        row.price,
        row.currency ?? "IDR",
        row.openPrice ?? null,
        row.highPrice ?? null,
        row.lowPrice ?? null,
        row.closePrice ?? null,
        row.source ?? "logammulia",
      ]
    );
    inserted += result.rowCount;
  }

  console.log(`Seed gold_prices: ${inserted} baris baru ditambahkan.`);
}

seedGoldPrices()
  .catch((err) => {
    console.error("Seed gagal:", err.message);
    process.exit(1);
  })
  .finally(() => pool.end());
