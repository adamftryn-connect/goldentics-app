// error handler global - semua response error memakai envelope di utils/response.js
import { sendError } from "../utils/response.js";

export function notFoundHandler(req, res) {
  sendError(res, `Route ${req.method} ${req.originalUrl} tidak ditemukan`, 404);
}

export function errorHandler(err, req, res, _next) {
  console.error(`[${new Date().toISOString()}]`, err.message);

  if (err.statusCode) {
    return sendError(res, err.message, err.statusCode);
  }

  const msg = String(err.message ?? "").toLowerCase();
  if (
    msg.includes("connect") ||
    msg.includes("econnreset") ||
    msg.includes("timeout") ||
    err.code === "ECONNREFUSED"
  ) {
    return sendError(
      res,
      "Database sementara tidak dapat dihubungi. Coba lagi dalam beberapa detik.",
      503
    );
  }

  return sendError(res, "Terjadi kesalahan pada server", 500);
}
