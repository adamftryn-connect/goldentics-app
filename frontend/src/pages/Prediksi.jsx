import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FooterSimple from '../components/FooterSimple'
import { getPredictHistory, postPredict, PREDICTION_PERIOD_OPTIONS } from '../api/goldenticsApi.js'
import { formatRupiah, formatPercent } from '../utils/format.js'
import iconRobot from '../../images/icon/ai-robot-icon.svg'
import './Prediksi.css'

function Prediksi() {
  const [showResult, setShowResult] = useState(false)
  const [gramOfGold, setGramOfGold] = useState('10')
  const [predictionDays, setPredictionDays] = useState(30)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [hasToken, setHasToken] = useState(
    Boolean(localStorage.getItem('goldentics_token'))
  )

  const [historyLoading, setHistoryLoading] = useState(false)
  const [historyError, setHistoryError] = useState(null)
  const [historyItems, setHistoryItems] = useState([])
  const [historyOffset, setHistoryOffset] = useState(0)
  const [historyHasMore, setHistoryHasMore] = useState(false)

  const periodLabel = useMemo(() => {
    const opt = PREDICTION_PERIOD_OPTIONS.find((o) => o.days === predictionDays)
    return opt?.label ?? `${predictionDays} Hari`
  }, [predictionDays])

  useEffect(() => {
    setHasToken(Boolean(localStorage.getItem('goldentics_token')))
  }, [])

  async function loadHistory({ reset = false } = {}) {
    const token = localStorage.getItem('goldentics_token')
    const ok = Boolean(token)
    setHasToken(ok)
    if (!ok) return

    const limit = 10
    const nextOffset = reset ? 0 : historyOffset
    setHistoryLoading(true)
    setHistoryError(null)
    try {
      const data = await getPredictHistory({ limit, offset: nextOffset })
      const list = Array.isArray(data) ? data : []
      const merged = reset ? list : [...historyItems, ...list]
      setHistoryItems(merged)
      setHistoryOffset(nextOffset + list.length)
      setHistoryHasMore(list.length === limit)
    } catch (e) {
      setHistoryError(e?.message || 'Gagal memuat riwayat prediksi')
      setHistoryItems(reset ? [] : historyItems)
      setHistoryHasMore(false)
    } finally {
      setHistoryLoading(false)
    }
  }

  async function handlePredict() {
    setShowResult(true)
    setError(null)
    setLoading(true)
    setResult(null)

    try {
      const data = await postPredict({
        gramOfGold: Number(gramOfGold),
        predictionDays: Number(predictionDays),
      })
      setResult(data)
      // Jika login, backend menyimpan riwayat otomatis → refresh history
      await loadHistory({ reset: true })
    } catch (e) {
      setError(e?.message || 'Gagal melakukan prediksi')
    } finally {
      setLoading(false)
    }
  }

  function handlePredictAgain() {
    setShowResult(false)
    setError(null)
    setResult(null)
    setLoading(false)
  }

  useEffect(() => {
    // Load awal riwayat bila user sudah login
    const token = localStorage.getItem('goldentics_token')
    if (token) {
      loadHistory({ reset: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="wrap2">
          <div className="eyebrow">Fitur Utama</div>
          <h1>Prediksi Harga Emas AI</h1>
          <p>Masukkan data emas Anda dan dapatkan prediksi harga serta rekomendasi beli/jual berbasis AI</p>
        </div>
      </div>

      <div className="main">
        <div className="pred-grid">
          {/* Form */}
          <div>
            <div className="form-card">
              <h2>Data Investasi Anda</h2>
              <p className="sub">Isi form berikut untuk mendapatkan prediksi yang dipersonalisasi</p>

              <div className="field">
                <label>Jumlah Emas yang Dimiliki</label>
                <div className="input-wrap">
                  <input
                    type="number"
                    placeholder="Contoh: 10"
                    value={gramOfGold}
                    onChange={(e) => setGramOfGold(e.target.value)}
                    min="0"
                  />
                  <span className="unit">gram</span>
                </div>
                <p className="field-hint">Masukkan jumlah emas dalam satuan gram</p>
              </div>

              <div className="or-divider"><span>atau masukkan nilai uang</span></div>

              <div className="field">
                <label>Nilai Investasi</label>
                <div className="input-wrap">
                  <input type="number" placeholder="Contoh: 27.000.000" />
                  <span className="unit">IDR</span>
                </div>
                <p className="field-hint">Sistem akan mengkonversi ke gram secara otomatis</p>
              </div>

              <div className="field">
                <label>Periode Prediksi</label>
                <select
                  className="select-field"
                  value={predictionDays}
                  onChange={(e) => setPredictionDays(Number(e.target.value))}
                >
                  {PREDICTION_PERIOD_OPTIONS.map((opt) => (
                    <option key={opt.days} value={opt.days}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button className="submit-btn" onClick={handlePredict} disabled={loading}>
                {loading ? 'Memproses…' : 'Dapatkan Prediksi →'}
              </button>

              <div className="disclaimer">
                <div className="disc-title">⚠️ Penting untuk Dibaca</div>
                <p>Website ini menggunakan model AI untuk memproyeksikan harga emas berdasarkan data historis. Prediksi <strong>tidak menjamin akurasi 100%</strong> dan bukan merupakan saran finansial resmi. Selalu lakukan riset mandiri dan konsultasikan dengan ahli keuangan sebelum mengambil keputusan investasi. <strong>Goldentics tidak bertanggung jawab</strong> atas kerugian yang timbul dari penggunaan prediksi ini.</p>
              </div>
            </div>
          </div>

          {/* Result panel */}
          <div className="result-panel">
            {!showResult ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <img className="empty-icon-img" src={iconRobot} alt="" aria-hidden="true" />
                </div>
                <h3>Belum ada prediksi</h3>
                <p>Isi form di sebelah kiri dan tekan "Dapatkan Prediksi" untuk melihat hasilnya di sini.</p>
              </div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                <div className="result-main">
                  <div className="rm-label">Prediksi ({periodLabel})</div>

                  {error ? (
                    <>
                      <div className="rm-price">Gagal memuat</div>
                      <div className="rm-sub">{error}</div>
                      <div className="rm-badge">Silakan coba lagi</div>
                    </>
                  ) : !result ? (
                    <>
                      <div className="rm-price">{loading ? 'Memproses…' : 'Belum ada hasil'}</div>
                      <div className="rm-sub">Masukkan gram dan pilih periode, lalu klik “Dapatkan Prediksi”.</div>
                    </>
                  ) : (
                    <>
                      <div className="rm-price">
                        {formatRupiah(result.predictedPrice)}
                        <span className="rm-unit"> total</span>
                      </div>
                      <div className="rm-sub">Estimasi harga · {result.predictedDate}</div>
                      <div className="rm-badge">
                        {result.trend === 'UP' ? '▲' : '▼'} {formatPercent(result.percentageChange)} dari harga saat ini
                      </div>
                    </>
                  )}
                </div>

                <div className="pred-actions">
                  <button className="pred-again-btn" onClick={handlePredictAgain} disabled={loading}>
                    Prediksi lagi
                  </button>
                  {!hasToken ? (
                    <div className="pred-login-hint">
                      Login/Register untuk menyimpan riwayat.
                      {' '}
                      <NavLink to="/login">Login</NavLink>
                      {' '}
                      ·
                      {' '}
                      <NavLink to="/register">Register</NavLink>
                    </div>
                  ) : null}
                </div>

                <div className="result-row">
                  <div className="result-mini">
                    <div className="rmi-label">Nilai Portofolio Kini</div>
                    <div className="rmi-val">{result ? formatRupiah(result.currentPrice) : '—'}</div>
                    <div className="rmi-sub">{result ? `${gramOfGold} gram` : '—'}</div>
                  </div>
                  <div className="result-mini">
                    <div className="rmi-label">Estimasi</div>
                    <div className="rmi-val" style={{color:'#16a34a'}}>{result ? formatRupiah(result.predictedPrice) : '—'}</div>
                    <div className="rmi-sub">{result ? `Selisih ${formatRupiah(result.priceChange)}` : '—'}</div>
                  </div>
                </div>

                <div className="rec-card">
                  <div className="rec-title">Rekomendasi AI</div>
                  <div className="rec-item">
                    <div className="rec-dot-wrap"><div className="rec-dot buy"></div></div>
                    <div className="rec-content">
                      <div className="rec-head">Pertimbangkan Beli</div>
                      <div className="rec-body">{result ? result.recommendation : 'Rekomendasi akan muncul setelah prediksi berhasil.'}</div>
                    </div>
                  </div>
                  <div className="rec-item">
                    <div className="rec-dot-wrap"><div className="rec-dot hold"></div></div>
                    <div className="rec-content">
                      <div className="rec-head">Atau Tahan Posisi</div>
                      <div className="rec-body">Anda bisa menyimpan prediksi ini dan membandingkan dengan pergerakan harga berikutnya.</div>
                    </div>
                  </div>
                  <div className="rec-item">
                    <div className="rec-dot-wrap"><div className="rec-dot sell"></div></div>
                    <div className="rec-content">
                      <div className="rec-head">Hindari Jual Sekarang</div>
                      <div className="rec-body">Keputusan investasi tetap di tangan Anda. Gunakan prediksi sebagai insight tambahan.</div>
                    </div>
                  </div>
                  <div className="confidence">
                    <div className="conf-label">Tingkat Kepercayaan Model AI</div>
                    <div className="conf-bar-track">
                      <div
                        className="conf-bar-fill"
                        style={{width: `${Math.round(((result?.confidence ?? 0) || 0) * 100)}%`}}
                      ></div>
                    </div>
                    <div className="conf-pct">
                      {result ? `${Math.round(result.confidence * 100)}% confidence` : '—'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Riwayat Prediksi (inline) */}
      {hasToken ? (
        <div className="main" style={{ paddingTop: 0 }}>
          <div className="history-card">
            <div className="history-hd">
              <div>
                <div className="history-title">Riwayat Prediksi</div>
                <div className="history-sub">
                  {historyLoading ? 'memuat…' : historyError ? 'gagal memuat' : `${historyItems.length} item`}
                </div>
              </div>
              <button
                className="history-refresh"
                onClick={() => loadHistory({ reset: true })}
                disabled={historyLoading}
              >
                Refresh
              </button>
            </div>

            {historyError ? <div className="history-error">{historyError}</div> : null}

            <div className="history-table-wrap">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Gram</th>
                    <th>Prediksi</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {historyLoading && historyItems.length === 0 ? (
                    <tr><td colSpan={4} className="history-empty">Memuat data…</td></tr>
                  ) : historyItems.length === 0 ? (
                    <tr><td colSpan={4} className="history-empty">Belum ada riwayat.</td></tr>
                  ) : (
                    historyItems.map((row) => (
                      <tr key={row.id}>
                        <td className="date">{new Date(row.createdAt).toLocaleString('id-ID')}</td>
                        <td>{row.gramOfGold} gr</td>
                        <td>{formatRupiah(row.predictedPrice)}</td>
                        <td className={row.trend === 'UP' ? 'up' : 'down'}>
                          {row.trend === 'UP' ? '▲ Naik' : '▼ Turun'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="history-ft">
              <button
                className="history-more"
                onClick={() => loadHistory({ reset: false })}
                disabled={historyLoading || !historyHasMore}
              >
                {historyLoading ? 'Memuat…' : historyHasMore ? 'Muat lebih banyak' : 'Tidak ada lagi'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <FooterSimple />
    </>
  )
}

export default Prediksi
