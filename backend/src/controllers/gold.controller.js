import {
  getGoldHistory,
  getLatestGoldSnapshot,
  getGoldStatsSummary,
} from "../services/gold.service.js";
import { sendError, sendSuccess } from "../utils/response.js";

/**
 * GET /api/gold-history
 *
 * response 200, data: array item histori:
 *   {
 *     date: "2026-05-27",
 *     price: number,           // harga per gram (IDR)
 *     currency: "IDR",
 *     openPrice?, highPrice?, lowPrice?, closePrice?,
 *     dailyReturn?               // desimal
 *   }
 */
export async function getGoldHistoryHandler(req, res, next) {
  try {
    const { period, startDate, endDate, limit } = req.query;
    const data = await getGoldHistory({
      period: period ?? "daily",
      startDate,
      endDate,
      limit,
    });
    return sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
}

// GET /api/gold-price/latest
export async function getLatestGoldPriceHandler(req, res) {
  const data = await getLatestGoldSnapshot();
  if (!data) {
    return sendError(res, "Data harga emas tidak tersedia", 404);
  }
  return sendSuccess(res, data);
}

/**
 * GET /api/gold-stats/summary?days=7
 *
 * query:
 *   - days: number (default 7, max 365) — window statistik untuk StatsBar
 */
export async function getGoldStatsSummaryHandler(req, res, next) {
  try {
    const days = req.query.days ?? 7;
    const data = await getGoldStatsSummary(days);
    if (!data) {
      return sendError(res, "Data statistik emas tidak tersedia", 404);
    }
    return sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
}
