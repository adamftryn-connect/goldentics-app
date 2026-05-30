/**
 *  mount route API 
 *
 * Development:
 * - Backend: http://localhost:5000
 *
 * Prefix route:
 * - GET  /health        → cek service + status database
 * - /api/auth/*         → register, login, profil 
 * - /api/*              → emas, prediksi 
 *
 */
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { checkDatabaseConnection } from "./db/pool.js";

const app = express();

app.use(cors());
app.use(express.json());

/** health check — tidak memakai envelope { success, data, error } */
app.get("/health", async (_req, res) => {
  const database = (await checkDatabaseConnection()) ? "connected" : "disconnected";
  res.json({ status: "ok", service: "goldentics-api", database });
});

app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
