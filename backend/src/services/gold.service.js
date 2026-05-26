import { goldHistoricalData } from "../data/data-gold.js";
import {
  isDatabaseAvailable,
  findAllGoldPrices,
  findLatestGoldPrice,
} from "../repositories/goldPrice.repository.js";

function parseDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toPublicRecord(entry) {
  const record = {
    date: entry.date,
    price: entry.price,
    currency: entry.currency,
  };

  if (entry.openPrice != null) record.openPrice = entry.openPrice;
  if (entry.highPrice != null) record.highPrice = entry.highPrice;
  if (entry.lowPrice != null) record.lowPrice = entry.lowPrice;
  if (entry.closePrice != null) record.closePrice = entry.closePrice;

  return record;
}

async function loadGoldEntries() {
  if (await isDatabaseAvailable()) {
    const rows = await findAllGoldPrices();
    if (rows.length > 0) {
      return rows;
    }
  }
  return [...goldHistoricalData];
}

function getLatestEntryFromList(entries) {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  return sorted[0] ?? null;
}

export async function getGoldHistory({ period = "monthly", startDate, endDate } = {}) {
  if (period !== "monthly" && period !== "yearly") {
    const err = new Error('period harus "monthly" atau "yearly"');
    err.statusCode = 400;
    throw err;
  }

  const start = startDate ? parseDate(startDate) : null;
  const end = endDate ? parseDate(endDate) : null;

  if (startDate && !start) {
    const err = new Error("startDate tidak valid. Gunakan format YYYY-MM-DD");
    err.statusCode = 400;
    throw err;
  }

  if (endDate && !end) {
    const err = new Error("endDate tidak valid. Gunakan format YYYY-MM-DD");
    err.statusCode = 400;
    throw err;
  }

  if (start && end && start > end) {
    const err = new Error("startDate tidak boleh lebih besar dari endDate");
    err.statusCode = 400;
    throw err;
  }

  let filtered = await loadGoldEntries();

  if (start) {
    filtered = filtered.filter((item) => parseDate(item.date) >= start);
  }

  if (end) {
    filtered = filtered.filter((item) => parseDate(item.date) <= end);
  }

  if (period === "yearly") {
    const byYear = new Map();
    for (const item of filtered) {
      const year = item.date.slice(0, 4);
      byYear.set(year, item);
    }
    filtered = [...byYear.values()].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }

  return filtered.map(toPublicRecord);
}

export async function getLatestGoldPrice() {
  if (await isDatabaseAvailable()) {
    const latest = await findLatestGoldPrice();
    if (latest) {
      return latest.price;
    }
  }
  return getLatestEntryFromList(goldHistoricalData)?.price ?? 0;
}

export async function getLatestGoldSnapshot() {
  let latest = null;

  if (await isDatabaseAvailable()) {
    latest = await findLatestGoldPrice();
  }

  if (!latest) {
    latest = getLatestEntryFromList(goldHistoricalData);
  }

  if (!latest) {
    return null;
  }

  return {
    ...toPublicRecord(latest),
    pricePerGram: latest.price,
    source: latest.source ?? "logammulia",
  };
}
