import { getGoldHistory } from "../services/gold.service.js";
import { sendSuccess } from "../utils/response.js";

export function getGoldHistoryHandler(req, res, next) {
  try {
    const { period, startDate, endDate } = req.query;
    const data = getGoldHistory({ period, startDate, endDate });
    return sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
}
