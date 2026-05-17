import { sendError } from "../utils/response.js";

export function notFoundHandler(req, res) {
  sendError(res, `Route ${req.method} ${req.originalUrl} tidak ditemukan`, 404);
}

export function errorHandler(err, req, res, _next) {
  console.error(`[${new Date().toISOString()}]`, err.message);

  if (err.statusCode) {
    return sendError(res, err.message, err.statusCode);
  }

  return sendError(res, "Terjadi kesalahan pada server", 500);
}
