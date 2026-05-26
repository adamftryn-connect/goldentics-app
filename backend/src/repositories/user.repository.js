import pool from "../db/pool.js";

export async function findUserByEmail(email) {
  const { rows } = await pool.query(
    `SELECT id, email, password_hash, full_name, created_at, updated_at
     FROM users WHERE email = $1`,
    [email.toLowerCase().trim()]
  );
  return rows[0] ?? null;
}

export async function findUserById(id) {
  const { rows } = await pool.query(
    `SELECT id, email, full_name, created_at, updated_at
     FROM users WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function createUser({ email, passwordHash, fullName }) {
  const { rows } = await pool.query(
    `INSERT INTO users (email, password_hash, full_name)
     VALUES ($1, $2, $3)
     RETURNING id, email, full_name, created_at, updated_at`,
    [email.toLowerCase().trim(), passwordHash, fullName ?? null]
  );
  return rows[0];
}

export function toPublicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name ?? null,
    createdAt: row.created_at,
  };
}
