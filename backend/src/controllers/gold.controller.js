import {
  getGoldHistory,
  getLatestGoldSnapshot,
} from "../services/gold.service.js";
import { sendError, sendSuccess } from "../utils/response.js";

export async function getGoldHistoryHandler(req, res, next) {
  try {
    const { period, startDate, endDate } = req.query;
    const data = await getGoldHistory({ period, startDate, endDate });
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
