import {
  predictGoldPrice,
  getPredictionHistory,
} from "../services/predict.service.js";
import { sendSuccess } from "../utils/response.js";

export async function predictHandler(req, res, next) {
  try {
    const userId = req.user?.id ?? null;
    const data = await predictGoldPrice(
      req.gramOfGold,
      req.predictionDays,
      userId
    );
    return sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
}

export async function getPredictHistoryHandler(req, res, next) {
  try {
    const { limit, offset } = req.query;
    const data = await getPredictionHistory(req.user.id, limit, offset);
    return sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
}
