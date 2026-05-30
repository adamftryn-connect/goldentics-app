import {
  predictGoldPrice,
  getPredictionHistory,
} from "../services/predict.service.js";
import { sendSuccess } from "../utils/response.js";

/**
 * POST /api/predict
 * Auth: opsional — jika ada Bearer token valid, hasil prediksi disimpan ke riwayat user
 *
 * Response 200, data:
 *   {
 *     gramOfGold,
 *     currentPrice,      // total IDR (gram × harga/gram saat ini)
 *     predictedPrice,    // total IDR prediksi
 *     priceChange,
 *     percentageChange,  // persen perubahan total investasi
 *     trend,             // sama dengan recommendationType: "UP" | "HOLD" | "DOWN"
 *     recommendationType,
 *     recommendation,    // teks penjelasan
 *     confidence,        // 0–1
 *     predictedDate,     // "YYYY-MM-DD"
 *     modelUsed
 *   }
 *
 */
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

// GET /api/predict-history
export async function getPredictHistoryHandler(req, res, next) {
  try {
    const { limit, offset } = req.query;
    const data = await getPredictionHistory(req.user.id, limit, offset);
    return sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
}
