-- daily gold history fields (CSV import)
ALTER TABLE gold_prices
  ADD COLUMN IF NOT EXISTS volume INTEGER,
  ADD COLUMN IF NOT EXISTS daily_return NUMERIC(12, 8);
