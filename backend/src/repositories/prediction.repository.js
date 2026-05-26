import pool from "../db/pool.js";

export async function insertPrediction(userId, result, predictionDays) {
  const { rows } = await pool.query(
    `INSERT INTO predictions (
      user_id, gram_of_gold, prediction_days,
      current_price, predicted_price, price_change,
      percentage_change, trend, confidence,
      predicted_date, recommendation, model_used
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    RETURNING id, gram_of_gold, predicted_price, trend, created_at`,
    [
      userId,
      result.gramOfGold,
      predictionDays,
      result.currentPrice,
      result.predictedPrice,
      result.priceChange,
      result.percentageChange,
      result.trend,
      result.confidence,
      result.predictedDate,
      result.recommendation,
      result.modelUsed,
    ]
  );
  return mapHistoryRow(rows[0]);
}

export async function findPredictionsByUserId(userId, limit, offset) {
  const { rows } = await pool.query(
    `SELECT id, gram_of_gold, predicted_price, trend, created_at
     FROM predictions
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );
  return rows.map(mapHistoryRow);
}

function mapHistoryRow(row) {
  return {
    id: row.id,
    gramOfGold: Number(row.gram_of_gold),
    predictedPrice: Number(row.predicted_price),
    trend: row.trend,
    createdAt: row.created_at,
  };
}
