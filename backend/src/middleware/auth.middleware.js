import { verifyToken } from "../services/auth.service.js";
import { findUserById, toPublicUser } from "../repositories/user.repository.js";
import { sendError } from "../utils/response.js";

function extractBearerToken(req) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return null;
  }
  return header.slice(7).trim();
}

export async function optionalAuth(req, _res, next) {
  try {
    const token = extractBearerToken(req);
    if (!token) {
      req.user = null;
      return next();
    }

    const payload = verifyToken(token);
    if (!payload?.userId) {
      req.user = null;
      return next();
    }

    const row = await findUserById(payload.userId);
    req.user = toPublicUser(row);
    next();
  } catch {
    req.user = null;
    next();
  }
}

export async function requireAuth(req, res, next) {
  const token = extractBearerToken(req);
  if (!token) {
    return sendError(res, "Autentikasi diperlukan", 401);
  }

  const payload = verifyToken(token);
  if (!payload?.userId) {
    return sendError(res, "Token tidak valid atau kedaluwarsa", 401);
  }

  const row = await findUserById(payload.userId);
  if (!row) {
    return sendError(res, "User tidak ditemukan", 401);
  }

  req.user = toPublicUser(row);
  next();
}
