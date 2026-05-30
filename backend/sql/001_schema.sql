-- database schema

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gold_prices (
  id SERIAL PRIMARY KEY,
  price_date DATE NOT NULL UNIQUE,
  price_per_gram BIGINT NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'IDR',
  open_price BIGINT,
  high_price BIGINT,
  low_price BIGINT,
  close_price BIGINT,
  source VARCHAR(50) DEFAULT 'logammulia',
  volume INTEGER,
  daily_return NUMERIC(12, 8),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gold_prices_date ON gold_prices (price_date DESC);

CREATE TABLE IF NOT EXISTS predictions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  gram_of_gold NUMERIC(12, 4) NOT NULL,
  prediction_days INTEGER NOT NULL,
  current_price BIGINT NOT NULL,
  predicted_price BIGINT NOT NULL,
  price_change BIGINT NOT NULL,
  percentage_change NUMERIC(6, 2) NOT NULL,
  trend VARCHAR(10) NOT NULL,
  confidence NUMERIC(4, 3) NOT NULL,
  predicted_date DATE NOT NULL,
  recommendation TEXT NOT NULL,
  model_used VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_predictions_user_created
  ON predictions (user_id, created_at DESC);
