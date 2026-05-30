/**
 * service prediction AI - POST /api/predict
 *   - percentageChange > +0.75%  = recommendationType "UP"
 *   - percentageChange < -0.75%  = "DOWN"
 *   - selain itu                 = "HOLD"
 */
import {
  callHuggingFacePrediction,
  isHuggingFaceConfigured,
} from "./huggingface.service.js";
import { getLatestGoldPrice } from "./gold.service.js";
import {
  insertPrediction,
  findPredictionsByUserId,
} from "../repositories/prediction.repository.js";
import { isDatabaseAvailable } from "../repositories/goldPrice.repository.js";

const SUPPORTED_PREDICTION_DAYS = 7;
const HF_SPACE_MODEL_LABEL = "Goldentics HF Space";

function addDays(baseDate, days) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

const NEUTRAL_THRESHOLD = 0.75;

// Threshold ±0.75% 
export function getRecommendationType(percentageChange) {
  const pct = Number(percentageChange) || 0;
  if (pct > NEUTRAL_THRESHOLD) return "UP";
  if (pct < -NEUTRAL_THRESHOLD) return "DOWN";
  return "HOLD";
}

function buildRecommendation(recommendationType, predictionDays) {
  const daysLabel = `${predictionDays} hari`;
  if (recommendationType === "UP") {
    return `Berdasarkan analisis AI, harga emas Anda diprediksi naik dalam ${daysLabel}. Pertahankan emas Anda; ini belum waktu yang ideal untuk menjual.`;
  }
  if (recommendationType === "DOWN") {
    return `Harga diprediksi turun dalam ${daysLabel}. Tunda pembelian baru; jika butuh likuiditas, pertimbangkan menjual sebagian dengan hati-hati.`;
  }
  return `Pergerakan harga diprediksi relatif stabil dalam ${daysLabel}. Pantau pasar sebelum menambah posisi atau menjual.`;
}

export function extractForecastPricePerGram(hfResponse, targetDay = SUPPORTED_PREDICTION_DAYS) {
  if (hfResponse == null) {
    return null;
  }

  const forecast = hfResponse.forecast;
  if (!Array.isArray(forecast) || forecast.length === 0) {
    return null;
  }

  const match = forecast.find((entry) => Number(entry?.day) === targetDay);
  const entry = match ?? forecast[forecast.length - 1];
  const price = Number(entry?.predicted_price);

  return Number.isFinite(price) ? price : null;
}

function extractModelPrediction(hfResponse) {
  const fromForecast = extractForecastPricePerGram(hfResponse);
  if (fromForecast != null) {
    return fromForecast;
  }

  if (hfResponse == null) {
    return null;
  }

  if (typeof hfResponse === "number") {
    return hfResponse;
  }

  if (Array.isArray(hfResponse) && hfResponse.length > 0) {
    const first = hfResponse[0];
    if (typeof first === "number") return first;
    if (first?.predicted_price != null) return Number(first.predicted_price);
    if (first?.price != null) return Number(first.price);
  }

  if (hfResponse.predicted_price != null) {
    return Number(hfResponse.predicted_price);
  }

  if (hfResponse.price != null) {
    return Number(hfResponse.price);
  }

  if (hfResponse[0]?.generated_text) {
    const parsed = Number(hfResponse[0].generated_text);
    if (!Number.isNaN(parsed)) return parsed;
  }

  return null;
}

function mockPrediction(currentPrice, predictionDays) {
  const volatility = 0.012 * Math.sqrt(predictionDays / 30);
  const direction = Math.random() > 0.45 ? 1 : -1;
  const changeRatio = direction * volatility * (0.5 + Math.random());
  return Math.round(currentPrice * (1 + changeRatio));
}

/**
 * menghitung prediksi; jika userId + DB ada, insert ke tabel predictions (riwayat).
 * return object = isi field `data` di response POST /api/predict.
 */
export async function predictGoldPrice(
  gramOfGold,
  predictionDays = SUPPORTED_PREDICTION_DAYS,
  userId = null
) {
  if (predictionDays !== SUPPORTED_PREDICTION_DAYS) {
    const err = new Error(
      `Model saat ini hanya mendukung prediksi ${SUPPORTED_PREDICTION_DAYS} hari`
    );
    err.statusCode = 400;
    throw err;
  }

  const currentPricePerGram = await getLatestGoldPrice();
  const currentTotal = currentPricePerGram * gramOfGold;

  let predictedPricePerGram = currentPricePerGram;
  let confidence = 0.75;
  let modelUsed = HF_SPACE_MODEL_LABEL;

  const hfPayload = {
    inputs: {
      gram_of_gold: gramOfGold,
      prediction_days: predictionDays,
      current_price: currentPricePerGram,
    },
  };

  if (isHuggingFaceConfigured()) {
    const hfResponse = await callHuggingFacePrediction(hfPayload);
    const extracted = extractForecastPricePerGram(hfResponse, predictionDays)
      ?? extractModelPrediction(hfResponse);

    if (extracted != null && !Number.isNaN(extracted)) {
      predictedPricePerGram = Math.round(extracted);
      confidence = 0.85;
    } else {
      predictedPricePerGram = mockPrediction(currentPricePerGram, predictionDays);
      confidence = 0.7;
      modelUsed = `${HF_SPACE_MODEL_LABEL} (fallback)`;
    }
  } else {
    predictedPricePerGram = mockPrediction(currentPricePerGram, predictionDays);
    confidence = 0.7;
    modelUsed = `${HF_SPACE_MODEL_LABEL} (local-fallback)`;
  }

  const predictedTotal = predictedPricePerGram * gramOfGold;
  const priceChange = predictedTotal - currentTotal;
  const percentageChange =
    currentTotal === 0
      ? 0
      : Number(((priceChange / currentTotal) * 100).toFixed(2));
  const recommendationType = getRecommendationType(percentageChange);
  const trend = recommendationType;
  const predictedDate = addDays(new Date(), predictionDays);

  const result = {
    gramOfGold,
    currentPrice: currentTotal,
    predictedPrice: predictedTotal,
    priceChange,
    percentageChange,
    trend,
    recommendationType,
    confidence,
    predictedDate,
    recommendation: buildRecommendation(recommendationType, predictionDays),
    modelUsed,
  };

  if (userId && (await isDatabaseAvailable())) {
    await insertPrediction(userId, result, predictionDays);
  }

  return result;
}

export async function getPredictionHistory(userId, limit = 10, offset = 0) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 10, 100));
  const safeOffset = Math.max(0, Number(offset) || 0);

  if (!(await isDatabaseAvailable())) {
    return [];
  }

  return findPredictionsByUserId(userId, safeLimit, safeOffset);
}
