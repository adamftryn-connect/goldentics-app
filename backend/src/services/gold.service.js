import { goldHistoricalData } from "../data/data-gold.js";
import {
  isDatabaseAvailable,
  findAllGoldPrices,
  findLatestGoldPrice,
  findRecentGoldPrices,
  findGoldPricesInRange,
  findGoldStatsLastNDays,
} from "../repositories/goldPrice.repository.js";

function parseDate(value) {
  const date = new Date(`${String(value).slice(0, 10)}T12:00:00`);
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
  if (entry.volume != null) record.volume = entry.volume;
  if (entry.dailyReturn != null) record.dailyReturn = entry.dailyReturn;

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

function aggregateMonthly(entries) {
  const byMonth = new Map();
  for (const item of entries) {
    const key = item.date.slice(0, 7);
    byMonth.set(key, item);
  }
  return [...byMonth.values()].sort((a, b) => a.date.localeCompare(b.date));
}

function aggregateYearly(entries) {
  const byYear = new Map();
  for (const item of entries) {
    const year = item.date.slice(0, 4);
    byYear.set(year, item);
  }
  return [...byYear.values()].sort((a, b) => a.date.localeCompare(b.date));
}

export async function getGoldHistory({
  period = "daily",
  startDate,
  endDate,
  limit,
} = {}) {
  const allowed = ["daily", "monthly", "yearly"];
  if (!allowed.includes(period)) {
    const err = new Error('period harus "daily", "monthly", atau "yearly"');
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

  let entries;

  if (period === "daily" && (await isDatabaseAvailable())) {
    if (limit && !startDate && !endDate) {
      entries = await findRecentGoldPrices(limit);
    } else if (startDate || endDate || limit) {
      entries = await findGoldPricesInRange({
        startDate: startDate?.slice(0, 10),
        endDate: endDate?.slice(0, 10),
        limit,
      });
    } else {
      entries = await findRecentGoldPrices(365);
    }
  } else {
    let filtered = await loadGoldEntries();

    if (start) {
      filtered = filtered.filter((item) => parseDate(item.date) >= start);
    }
    if (end) {
      filtered = filtered.filter((item) => parseDate(item.date) <= end);
    }

    if (period === "yearly") {
      filtered = aggregateYearly(filtered);
    } else if (period === "monthly") {
      filtered = aggregateMonthly(filtered);
    }

    if (limit) {
      const n = Math.max(1, Number(limit));
      filtered = filtered.slice(-n);
    }

    entries = filtered;
  }

  return entries.map(toPublicRecord);
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
    pricePerGram: latest.closePrice ?? latest.price,
    source: latest.source ?? "logammulia",
  };
}

export async function getGoldStatsSummary(days = 7) {
  const safeDays = Math.max(1, Math.min(Number(days) || 7, 365));

  if (!(await isDatabaseAvailable())) {
    const latest = getLatestEntryFromList(goldHistoricalData);
    if (!latest) return null;
    return {
      lastDate: latest.date,
      latestPrice: latest.price,
      volumeLatest: null,
      high7d: latest.price,
      change7dPct: 0,
    };
  }

  const window = await findGoldStatsLastNDays(safeDays);
  if (window.length === 0) return null;

  const latest = window[window.length - 1];
  const first = window[0];
  const latestPrice = latest.closePrice ?? latest.price;
  const firstPrice = first.closePrice ?? first.price;

  const high7d = window.reduce(
    (max, row) => Math.max(max, row.highPrice ?? row.price),
    0
  );

  const change7dPct =
    firstPrice === 0
      ? 0
      : Number((((latestPrice - firstPrice) / firstPrice) * 100).toFixed(2));

  const dailyReturnPct =
    latest.dailyReturn != null
      ? Number((latest.dailyReturn * 100).toFixed(2))
      : null;

  return {
    lastDate: latest.date,
    latestPrice,
    volumeLatest: latest.volume ?? null,
    high7d,
    change7dPct,
    dailyReturnPct,
  };
}
