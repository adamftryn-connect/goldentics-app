import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../src/db/pool.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CSV_CANDIDATES = [
  path.join(__dirname, "..", "data", "gold_historis.csv"),
  path.join(__dirname, "..", "data gold historis", "gold_historis.csv"),
];

const BATCH_SIZE = 500;

function resolveCsvPath() {
  for (const p of CSV_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error(
    `CSV tidak ditemukan. Letakkan gold_historis.csv di backend/data/ atau backend/data gold historis/`
  );
}

function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  fields.push(current.trim());
  return fields;
}

function parsePriceIdr(value) {
  if (!value) return null;
  const digits = value.replace(/Rp/gi, "").replace(/\s/g, "").replace(/,/g, "");
  const num = Number(digits);
  return Number.isFinite(num) ? Math.round(num) : null;
}

function parseDateDdMmYyyy(value) {
  const [dd, mm, yyyy] = value.split("/");
  if (!dd || !mm || !yyyy) return null;
  return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
}

function parseCsvRows(content) {
  const lines = content.split(/\r?\n/).filter((l) => l.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i]);
    if (fields.length < 7) continue;

    const priceDate = parseDateDdMmYyyy(fields[0]);
    const open = parsePriceIdr(fields[1]);
    const high = parsePriceIdr(fields[2]);
    const low = parsePriceIdr(fields[3]);
    const close = parsePriceIdr(fields[4]);
    const dailyReturn = Number(fields[5]);
    const volume = Number(fields[6]);

    if (!priceDate || close == null) continue;

    rows.push({
      priceDate,
      close,
      open: open ?? close,
      high: high ?? close,
      low: low ?? close,
      dailyReturn: Number.isFinite(dailyReturn) ? dailyReturn : null,
      volume: Number.isFinite(volume) ? Math.round(volume) : null,
    });
  }

  return rows;
}

async function insertBatch(client, batch) {
  if (batch.length === 0) return 0;

  const values = [];
  const params = [];
  let paramIndex = 1;

  for (const row of batch) {
    values.push(
      `($${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++})`
    );
    params.push(
      row.priceDate,
      row.close,
      "IDR",
      row.open,
      row.high,
      row.low,
      row.close,
      "logammulia",
      row.volume,
      row.dailyReturn
    );
  }

  const sql = `INSERT INTO gold_prices (
    price_date, price_per_gram, currency,
    open_price, high_price, low_price, close_price,
    source, volume, daily_return
  ) VALUES ${values.join(", ")}`;

  const result = await client.query(sql, params);
  return result.rowCount;
}

async function importGoldCsv() {
  const csvPath = resolveCsvPath();
  const content = fs.readFileSync(csvPath, "utf8");
  const rows = parseCsvRows(content);

  if (rows.length === 0) {
    throw new Error("Tidak ada baris valid di CSV");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("TRUNCATE gold_prices RESTART IDENTITY");

    let inserted = 0;
    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const batch = rows.slice(i, i + BATCH_SIZE);
      inserted += await insertBatch(client, batch);
    }

    await client.query("COMMIT");

    const sample = rows[rows.length - 1];
    console.log(`Import selesai: ${inserted} baris dari ${csvPath}`);
    console.log(
      `Rentang: ${rows[0].priceDate} → ${sample.priceDate} | contoh close: ${sample.close}`
    );
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

importGoldCsv()
  .catch((err) => {
    console.error("Import gagal:", err.message);
    process.exit(1);
  })
  .finally(() => pool.end());
