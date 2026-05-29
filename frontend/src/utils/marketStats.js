import { formatRupiah, formatPercent } from './format.js'
import { formatGoldDateId } from './goldChart.js'

export const VOLUME_WINDOW_LABEL = '24j'

/** Volume utama: "1.261 Lot" (baris kedua; baris ketiga pakai VOLUME_WINDOW_LABEL) */
export function formatVolumeLot(volume) {
  if (volume == null || Number.isNaN(Number(volume))) return '—'
  return `${Number(volume).toLocaleString('id-ID')} Lot`
}

/** Tertinggi 7 hari per gram */
export function formatHigh7dPerGram(high7d) {
  if (high7d == null || Number.isNaN(Number(high7d))) return '—'
  return `${formatRupiah(high7d)}/gr`
}

export function formatDailyChangeBadge(latest, summary) {
  const pct =
    latest?.dailyReturn != null
      ? latest.dailyReturn * 100
      : summary?.dailyReturnPct != null
        ? summary.dailyReturnPct
        : null
  if (pct == null) return null
  const up = pct >= 0
  return {
    text: `${up ? '▲' : '▼'} ${formatPercent(pct)} dari hari sebelumnya`,
    up,
  }
}

export function formatLatestPriceSub(latest, loading) {
  if (loading) return 'memuat…'
  if (!latest?.date) return 'per gram'
  return `per gram · ${formatGoldDateId(latest.date)}`
}

export const STATIC_PREDIKSI_7D_LABEL = 'Rp 2.780.000/gr'
