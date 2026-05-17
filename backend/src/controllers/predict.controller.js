import {
  predictGoldPrice,
  getPredictionHistory,
} from "../services/predict.service.js";
import { sendSuccess } from "../utils/response.js";

export async function predictHandler(req, res, next) {
  try {
    const data = await predictGoldPrice(req.gramOfGold, req.predictionDays);
    return sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
}

export function getPredictHistoryHandler(req, res) {
  const { limit, offset } = req.query;
  const data = getPredictionHistory(limit, offset);
  return sendSuccess(res, data);
}
