/**
 * service authentication
 * registerUser / loginUser return { token, user } untuk di simpan di localStorage
 */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  findUserById,
  toPublicUser,
} from "../repositories/user.repository.js";

const SALT_ROUNDS = 12;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    const err = new Error("JWT_SECRET tidak dikonfigurasi dengan benar");
    err.statusCode = 500;
    throw err;
  }
  return secret;
}

function signToken(userId) {
  return jwt.sign(
    { sub: userId },
    getJwtSecret(),
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

// verifikasi JWT dari header Bearer; return { userId } atau null
export function verifyToken(token) {
  try {
    const payload = jwt.verify(token, getJwtSecret());
    return { userId: payload.sub };
  } catch {
    return null;
  }
}

function validateEmail(email) {
  const normalized = String(email ?? "").trim().toLowerCase();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
  if (!ok) {
    const err = new Error("Format email tidak valid");
    err.statusCode = 400;
    throw err;
  }
  return normalized;
}

function validatePassword(password) {
  if (!password || String(password).length < 8) {
    const err = new Error("Password minimal 8 karakter");
    err.statusCode = 400;
    throw err;
  }
}

export async function registerUser({ email, password, fullName }) {
  const normalizedEmail = validateEmail(email);
  validatePassword(password);

  const existing = await findUserByEmail(normalizedEmail);
  if (existing) {
    const err = new Error("Email sudah terdaftar");
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await createUser({
    email: normalizedEmail,
    passwordHash,
    fullName: fullName?.trim() || null,
  });

  const token = signToken(user.id);
  return { token, user: toPublicUser(user) };
}

// return shape sama dengan register
export async function loginUser({ email, password }) {
  const normalizedEmail = validateEmail(email);
  validatePassword(password);

  const user = await findUserByEmail(normalizedEmail);
  if (!user) {
    const err = new Error("Email atau password salah");
    err.statusCode = 401;
    throw err;
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    const err = new Error("Email atau password salah");
    err.statusCode = 401;
    throw err;
  }

  const token = signToken(user.id);
  return { token, user: toPublicUser(user) };
}

export async function getUserProfile(userId) {
  const user = await findUserById(userId);
  if (!user) {
    const err = new Error("User tidak ditemukan");
    err.statusCode = 404;
    throw err;
  }
  return toPublicUser(user);
}
