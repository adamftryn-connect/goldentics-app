import {
  getGoldHistory,
  getLatestGoldSnapshot,
  getGoldStatsSummary,
} from "../services/gold.service.js";
import { sendError, sendSuccess } from "../utils/response.js";

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

export async function getLatestGoldPriceHandler(req, res) {
  const data = await getLatestGoldSnapshot();
  if (!data) {
    return sendError(res, "Data harga emas tidak tersedia", 404);
  }
  return sendSuccess(res, data);
}

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
