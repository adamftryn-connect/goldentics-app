import { formatPercent, formatRupiah } from './format.js'

export const NEUTRAL_THRESHOLD = 0.75

/** @typedef {'up' | 'hold' | 'down'} RecommendationVariant */

/**
 * @param {number} percentageChange
 * @returns {RecommendationVariant}
 */
export function getRecommendationVariant(percentageChange) {
  const pct = Number(percentageChange) || 0
  if (pct > NEUTRAL_THRESHOLD) return 'up'
  if (pct < -NEUTRAL_THRESHOLD) return 'down'
  return 'hold'
}

/**
 * @param {RecommendationVariant} variant
 */
export function getTrendBadgeLabel(variant) {
  if (variant === 'up') return { icon: '▲', label: 'Naik' }
  if (variant === 'down') return { icon: '▼', label: 'Turun' }
  return { icon: '→', label: 'Stabil' }
}

/**
 * @param {object} result
 * @param {number} [predictionDays=7]
 */
export function getRecommendationView(result, predictionDays = 7) {
  const pct = Number(result?.percentageChange) || 0
  const variant = getRecommendationVariant(pct)
  const daysLabel = `${predictionDays} hari`
  const pctFormatted = formatPercent(pct)
  const predictedFormatted = formatRupiah(result?.predictedPrice ?? 0)
  const absPct = Math.abs(pct).toFixed(2)

  const configs = {
    up: {
      variant: 'up',
      title: 'TAHAN EMAS',
      summary: `Berdasarkan analisis AI, harga emas Anda diprediksi naik dalam ${daysLabel}. Pertahankan emas Anda sampai waktunya untuk menjual. Hal ini akan memberikan Anda keuntungan maksimal.`,
      potentialLabel: 'Potensi Kenaikan',
      reasonText: `Harga diprediksi naik dalam ${daysLabel} ke depan`,
    },
    hold: {
      variant: 'hold',
      title: 'TAHAN & PANTAU',
      summary: `Pergerakan harga diprediksi relatif stabil (~${absPct}%). Pantau pasar dan tunda keputusan beli atau jual besar sampai ada sinyal tren yang lebih jelas.`,
      potentialLabel: 'Perubahan Estimasi',
      reasonText: `Tidak ada tren kuat naik atau turun dalam ${daysLabel} ke depan`,
    },
    down: {
      variant: 'down',
      title: 'TUNDA BELI — WASPADA JUAL',
      summary: `Harga diprediksi turun dalam ${daysLabel}. Tunda pembelian baru; jika butuh likuiditas, pertimbangkan menjual sebagian dengan hati-hati.`,
      potentialLabel: 'Potensi Penurunan',
      reasonText: `Harga diprediksi turun dalam ${daysLabel} ke depan`,
    },
  }

  const cfg = configs[variant]

  return {
    ...cfg,
    potentialValue: `${pctFormatted} dalam ${daysLabel}`,
    predictedValue: predictedFormatted,
    trendBadge: getTrendBadgeLabel(variant),
  }
}

/**
 * Riwayat: gunakan percentageChange jika ada, fallback ke trend DB.
 * @param {{ percentageChange?: number, trend?: string }} row
 */
export function getHistoryTrendDisplay(row) {
  if (row.percentageChange != null && !Number.isNaN(Number(row.percentageChange))) {
    const badge = getTrendBadgeLabel(getRecommendationVariant(row.percentageChange))
    return { className: getRecommendationVariant(row.percentageChange), ...badge }
  }
  if (row.trend === 'HOLD') {
    return { className: 'hold', icon: '→', label: 'Stabil' }
  }
  if (row.trend === 'UP') {
    return { className: 'up', icon: '▲', label: 'Naik' }
  }
  return { className: 'down', icon: '▼', label: 'Turun' }
}
