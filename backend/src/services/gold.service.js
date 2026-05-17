import { goldHistoricalData } from "../data/data-gold.js";

function parseDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toPublicRecord(entry) {
  return {
    date: entry.date,
    price: entry.price,
    currency: entry.currency,
  };
}

export function getGoldHistory({ period = "monthly", startDate, endDate } = {}) {
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

  let filtered = [...goldHistoricalData];

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

export function getLatestGoldPrice() {
  const sorted = [...goldHistoricalData].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
  return sorted[0]?.price ?? 0;
}
