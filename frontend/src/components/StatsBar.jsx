import { formatRupiah } from '../utils/format.js'

function StatsBar({ latest = null, loading = false, error = null }) {
  const priceLabel = latest ? `${formatRupiah(latest.pricePerGram)}/gr` : '—'

  const priceStatus = loading
    ? 'memuat…'
    : error
      ? 'gagal memuat'
      : latest
        ? 'terbaru'
        : '—'

  return (
    <div className="stats-bar-section">
      <div className="wrap2">
        <div className="stats-bar">
          <div className="stats-item">
            <div className="stats-lbl">Harga Hari Ini</div>
            <div className="stats-val">{priceLabel}</div>
            <div className={`stats-chg ${loading || error ? '' : 'up'}`}>{priceStatus}</div>
          </div>
          <div className="stats-item">
            <div className="stats-lbl">Volume 24 Jam</div>
            <div className="stats-val">426 lot</div>
            <div className="stats-chg up">▲ naik</div>
          </div>
          <div className="stats-item">
            <div className="stats-lbl">Tertinggi 7 Hari</div>
            <div className="stats-val">Rp 2.850.000/gr</div>
            <div className="stats-chg up">▲ +4,1% mingguan</div>
          </div>
          <div className="stats-item">
            <div className="stats-lbl">Prediksi 7 Hari</div>
            <div className="stats-val amber">Rp 2.780.000/gr</div>
            <div className="stats-chg amber">▲ Potensi naik</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsBar
