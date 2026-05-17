import { Router } from "express";
import { getGoldHistoryHandler } from "../controllers/gold.controller.js";
import {
  predictHandler,
  getPredictHistoryHandler,
} from "../controllers/predict.controller.js";
import { validatePredictBody } from "../middleware/validatePredict.js";

const router = Router();

router.get("/gold-history", getGoldHistoryHandler);
router.post("/predict", validatePredictBody, predictHandler);
router.get("/predict-history", getPredictHistoryHandler);

export default router;
