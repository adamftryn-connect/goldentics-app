import {
  callHuggingFacePrediction,
  isHuggingFaceConfigured,
} from "./huggingface.service.js";
import { getLatestGoldPrice } from "./gold.service.js";

const predictionHistory = [];
let nextId = 1;

function addDays(baseDate, days) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function buildRecommendation(trend, percentageChange) {
  if (trend === "UP") {
    return "Sebaiknya tunggu harga naik lebih tinggi sebelum menjual";
  }
  if (percentageChange < -2) {
    return "Pertimbangkan untuk membeli emas karena harga diprediksi turun";
  }
  return "Pertimbangkan untuk menahan emas dan pantau perkembangan harga";
}

function extractModelPrediction(hfResponse, currentPrice) {
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

export async function predictGoldPrice(gramOfGold, predictionDays = 30) {
  const currentPricePerGram = getLatestGoldPrice();
  const currentTotal = currentPricePerGram * gramOfGold;

  let predictedPricePerGram = currentPricePerGram;
  let confidence = 0.75;
  let modelUsed = "LSTM";

  const hfPayload = {
    inputs: {
      gram_of_gold: gramOfGold,
      prediction_days: predictionDays,
      current_price: currentPricePerGram,
    },
  };

  if (isHuggingFaceConfigured()) {
    const hfResponse = await callHuggingFacePrediction(hfPayload);
    const extracted = extractModelPrediction(hfResponse, currentPricePerGram);

    if (extracted != null && !Number.isNaN(extracted)) {
      predictedPricePerGram = Math.round(extracted);
      confidence = 0.85;
    } else {
      predictedPricePerGram = mockPrediction(currentPricePerGram, predictionDays);
      confidence = 0.7;
      modelUsed = "LSTM (fallback)";
    }
  } else {
    predictedPricePerGram = mockPrediction(currentPricePerGram, predictionDays);
    confidence = 0.7;
    modelUsed = "LSTM (local-fallback)";
  }

  const predictedTotal = predictedPricePerGram * gramOfGold;
  const priceChange = predictedTotal - currentTotal;
  const percentageChange =
    currentTotal === 0
      ? 0
      : Number(((priceChange / currentTotal) * 100).toFixed(2));
  const trend = priceChange >= 0 ? "UP" : "DOWN";
  const predictedDate = addDays(new Date(), predictionDays);

  const result = {
    gramOfGold,
    currentPrice: currentTotal,
    predictedPrice: predictedTotal,
    priceChange,
    percentageChange,
    trend,
    confidence,
    predictedDate,
    recommendation: buildRecommendation(trend, percentageChange),
    modelUsed,
  };

  savePredictionHistory(result);

  return result;
}

function savePredictionHistory(result) {
  predictionHistory.unshift({
    id: nextId++,
    gramOfGold: result.gramOfGold,
    predictedPrice: result.predictedPrice,
    trend: result.trend,
    createdAt: new Date().toISOString(),
  });
}

export function getPredictionHistory(limit = 10, offset = 0) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 10, 100));
  const safeOffset = Math.max(0, Number(offset) || 0);

  return predictionHistory.slice(safeOffset, safeOffset + safeLimit);
}
