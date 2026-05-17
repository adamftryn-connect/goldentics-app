export function validatePredictBody(req, res, next) {
  const { gramOfGold, predictionDays } = req.body ?? {};

  if (gramOfGold === undefined || gramOfGold === null) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "gramOfGold wajib diisi",
    });
  }

  const grams = Number(gramOfGold);
  if (Number.isNaN(grams) || grams <= 0) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "gramOfGold harus lebih besar dari 0",
    });
  }

  if (predictionDays !== undefined && predictionDays !== null) {
    const days = Number(predictionDays);
    if (Number.isNaN(days) || days <= 0 || !Number.isInteger(days)) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "predictionDays harus berupa bilangan bulat positif",
      });
    }
    req.predictionDays = days;
  } else {
    req.predictionDays = 30;
  }

  req.gramOfGold = grams;
  next();
}
