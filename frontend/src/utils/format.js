export function formatRupiah(value) {
  const amount = Number(value) || 0;
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export function formatPercent(value) {
  const num = Number(value) || 0;
  const sign = num >= 0 ? "+" : "";
  return `${sign}${num.toFixed(2)}%`;
}
