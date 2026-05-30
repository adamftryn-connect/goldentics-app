/**
 * endpoint `/api` dan `/api/auth` (kecuali GET `/health`) memakai envelope:
 *
 *   { success: boolean, data: T | null, error: string | null }
 */

/** @param {import('express').Response} res @param {unknown} data @param {number} [statusCode] */
export function sendSuccess(res, data, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
    error: null,
  });
}

/** @param {import('express').Response} res @param {string} message @param {number} [statusCode] */
export function sendError(res, message, statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    data: null,
    error: message,
  });
}
