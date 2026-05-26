import { Router } from "express";
import {
  getGoldHistoryHandler,
  getLatestGoldPriceHandler,
} from "../controllers/gold.controller.js";
import {
  predictHandler,
  getPredictHistoryHandler,
} from "../controllers/predict.controller.js";
import { validatePredictBody } from "../middleware/validatePredict.js";
import {
  optionalAuth,
  requireAuth,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get("/gold-history", getGoldHistoryHandler);
router.get("/gold-price/latest", getLatestGoldPriceHandler);
router.post("/predict", optionalAuth, validatePredictBody, predictHandler);
router.get("/predict-history", requireAuth, getPredictHistoryHandler);

export default router;
