import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { checkDatabaseConnection } from "./db/pool.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", async (_req, res) => {
  const database = (await checkDatabaseConnection()) ? "connected" : "disconnected";
  res.json({ status: "ok", service: "goldentics-api", database });
});

app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
