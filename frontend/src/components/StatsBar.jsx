import { formatRupiah } from '../utils/format.js'
import { formatGoldDateId } from '../utils/goldChart.js'
import {
  formatVolumeLot,
  formatHigh7dPerGram,
  VOLUME_WINDOW_LABEL,
  STATIC_PREDIKSI_7D_LABEL,
} from '../utils/marketStats.js'

function StatsBar({
  latest = null,
  summary = null,
  loading = false,
  error = null,
}) {
  const priceLabel = latest
    ? `${formatRupiah(latest.pricePerGram)}/gr`
    : '—'

  const priceStatus = loading
    ? 'memuat…'
    : error
      ? 'gagal memuat'
      : latest?.date
        ? formatGoldDateId(latest.date)
        : '—'

  const volumeVal = formatVolumeLot(summary?.volumeLatest)
  const high7d = formatHigh7dPerGram(summary?.high7d)

  return (
    <div className="stats-bar-section">
      <div className="wrap2">
        <div className="stats-bar">
          <div className="stats-item">
            <div className="stats-lbl">Harga Terakhir</div>
            <div className="stats-val">{loading ? '…' : priceLabel}</div>
            <div className={`stats-chg ${loading || error ? '' : 'up'}`}>
              {priceStatus}
            </div>
          </div>
          <div className="stats-item">
            <div className="stats-lbl">Volume</div>
            <div className="stats-val">{loading ? '…' : volumeVal}</div>
            <div className="stats-chg">{VOLUME_WINDOW_LABEL}</div>
          </div>
          <div className="stats-item">
            <div className="stats-lbl">Tertinggi 7 Hari</div>
            <div className="stats-val">{loading ? '…' : high7d}</div>
            <div className="stats-chg up">per gram</div>
          </div>
          <div className="stats-item">
            <div className="stats-lbl">Prediksi 7 Hari</div>
            <div className="stats-val amber">{STATIC_PREDIKSI_7D_LABEL}</div>
            <div className="stats-chg amber">▲ Potensi naik</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsBar
