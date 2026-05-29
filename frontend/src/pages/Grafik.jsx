import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import StatsBar from '../components/StatsBar'
import FooterSimple from '../components/FooterSimple'
import {
  getGoldHistory,
  getLatestGoldPrice,
  getGoldStatsSummary,
  GRAFIK_TAB_LIMITS,
} from '../api/goldenticsApi.js'
import { formatRupiah, formatPercent } from '../utils/format.js'
import {
  buildGoldLineChart,
  computePeriodSummary,
  formatGoldDateId,
} from '../utils/goldChart.js'
import './Grafik.css'

const TABS = Object.keys(GRAFIK_TAB_LIMITS)

function Grafik() {
  const [activeTab, setActiveTab] = useState('7 Hari')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])
  const [latest, setLatest] = useState(null)
  const [summary, setSummary] = useState(null)

  const limitByTab = GRAFIK_TAB_LIMITS[activeTab] ?? 7

  const chart = useMemo(() => buildGoldLineChart(history), [history])
  const periodSummary = useMemo(() => computePeriodSummary(history), [history])

  const lastUpdatedLabel = latest?.date ? formatGoldDateId(latest.date) : null

  const latestDailyChange =
    latest?.dailyReturn != null
      ? formatPercent(latest.dailyReturn * 100)
      : summary?.dailyReturnPct != null
        ? formatPercent(summary.dailyReturnPct)
        : null
  const latestChangeUp =
    (latest?.dailyReturn ?? summary?.dailyReturnPct ?? 0) >= 0

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [hist, latestPrice, stats] = await Promise.all([
          getGoldHistory({ period: 'daily', limit: limitByTab }),
          getLatestGoldPrice(),
          getGoldStatsSummary(7),
        ])

        if (cancelled) return
        setHistory(Array.isArray(hist) ? hist : [])
        setLatest(latestPrice)
        setSummary(stats)
      } catch (e) {
        if (cancelled) return
        setError(e?.message || 'Gagal memuat data histori')
        setHistory([])
        setLatest(null)
        setSummary(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [activeTab, limitByTab])

  const gramMultipliers = [5, 10, 25, 50]
  const pricePerGram = latest?.pricePerGram ?? latest?.price ?? 0

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="wrap2">
          <div className="eyebrow">Data Historis</div>
          <h1>Grafik &amp; Histori Harga Emas</h1>
          <p>
            Pantau pergerakan harga emas berdasarkan data historis harian
            {lastUpdatedLabel ? ` · Terakhir: ${lastUpdatedLabel}` : ''}
          </p>
        </div>
      </div>

      <StatsBar
        latest={latest}
        summary={summary}
        loading={loading}
        error={error}
      />

      <div className="main-grafik">
        <div className="main-grid">
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title">Grafik Harga Emas</div>
                <div className="chart-sub">
                  Harga penutupan (close) per hari · {activeTab}
                </div>
              </div>
              <div className="filter-tabs">
                {TABS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={'tab' + (activeTab === t ? ' active' : '')}
                    onClick={() => setActiveTab(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="chart-wrap">
              {loading ? (
                <div className="chart-empty">Memuat grafik…</div>
              ) : error ? (
                <div className="chart-empty">{error}</div>
              ) : !chart ? (
                <div className="chart-empty">Tidak ada data untuk ditampilkan.</div>
              ) : (
                <>
                  <div className="chart-tooltip">
                    {formatRupiah(chart.lastPoint.price)}
                  </div>
                  <svg viewBox={`0 0 ${chart.width} ${chart.height}`} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C9910A" stopOpacity=".18" />
                        <stop offset="100%" stopColor="#C9910A" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {chart.yTicks.map((tick) => (
                      <g key={tick.label}>
                        <line
                          x1={chart.padLeft}
                          y1={tick.y}
                          x2={chart.width - chart.padRight}
                          y2={tick.y}
                          stroke="#f0f0f0"
                          strokeWidth="1"
                        />
                        <text
                          x="0"
                          y={tick.y + 3}
                          fontSize="9"
                          fill="#bbb"
                          fontFamily="Poppins,sans-serif"
                        >
                          {tick.label}
                        </text>
                      </g>
                    ))}
                    <path d={chart.areaD} fill="url(#g1)" />
                    <path
                      d={chart.lineD}
                      fill="none"
                      stroke="#C9910A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx={chart.lastPoint.x}
                      cy={chart.lastPoint.y}
                      r="5"
                      fill="#C9910A"
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    {chart.xLabels.map((lbl) => (
                      <text
                        key={lbl.label}
                        x={lbl.x}
                        y={chart.height - 4}
                        fontSize="9"
                        fill="#bbb"
                        fontFamily="Poppins,sans-serif"
                        textAnchor="middle"
                      >
                        {lbl.label}
                      </text>
                    ))}
                  </svg>
                </>
              )}
            </div>
          </div>

          <div className="sidebar">
            <div className="side-card">
              <h3>Harga Saat Ini</h3>
              <div className="price-now">
                <div className="price-now-lbl">Logam Mulia Antam</div>
                <div className="price-now-val">
                  {latest ? formatRupiah(pricePerGram) : '—'}
                </div>
                {latestDailyChange ? (
                  <div className={`price-badge ${latestChangeUp ? '' : 'down'}`}>
                    {latestChangeUp ? '▲' : '▼'} {latestDailyChange} hari terakhir
                  </div>
                ) : null}
              </div>
              <div className="price-rows">
                {gramMultipliers.map((g) => (
                  <div key={g} className="price-row">
                    <span className="price-row-lbl">{g} gram</span>
                    <span className="price-row-val">
                      {latest ? formatRupiah(pricePerGram * g) : '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="side-card">
              <h3>Ringkasan Periode</h3>
              <div className="summary-rows">
                {!periodSummary ? (
                  <div className="sum-row">
                    <span className="sum-lbl">—</span>
                    <span className="sum-val">Belum ada data</span>
                  </div>
                ) : (
                  <>
                    <div className="sum-row">
                      <span className="sum-lbl">Pembukaan</span>
                      <span className="sum-val">{formatRupiah(periodSummary.open)}</span>
                    </div>
                    <div className="sum-row">
                      <span className="sum-lbl">Tertinggi</span>
                      <span className="sum-val up">{formatRupiah(periodSummary.high)}</span>
                    </div>
                    <div className="sum-row">
                      <span className="sum-lbl">Terendah</span>
                      <span className="sum-val down">{formatRupiah(periodSummary.low)}</span>
                    </div>
                    <div className="sum-row">
                      <span className="sum-lbl">Penutupan</span>
                      <span className="sum-val">{formatRupiah(periodSummary.close)}</span>
                    </div>
                    <div className="sum-row">
                      <span className="sum-lbl">Perubahan</span>
                      <span
                        className={`sum-val ${periodSummary.change >= 0 ? 'up' : 'down'}`}
                      >
                        {periodSummary.change >= 0 ? '+' : ''}
                        {formatRupiah(periodSummary.change)} (
                        {formatPercent(periodSummary.changePct)})
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-section">
        <div className="table-card">
          <div className="table-hd">
            <div>
              <h3>Histori Harga Emas</h3>
              <p>Data historis harian · {activeTab}</p>
            </div>
          </div>
          <table className="tbl">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Harga Open</th>
                <th>Tertinggi</th>
                <th>Terendah</th>
                <th>Harga Tutup</th>
                <th>Volume</th>
                <th>Perubahan</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="date" colSpan={7}>
                    Memuat data…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td className="date" colSpan={7}>
                    {error}
                  </td>
                </tr>
              ) : history.length === 0 ? (
                <tr>
                  <td className="date" colSpan={7}>
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                [...history].reverse().map((row, idx) => {
                  const open = row.openPrice ?? row.price
                  const close = row.closePrice ?? row.price
                  const pct =
                    row.dailyReturn != null
                      ? row.dailyReturn * 100
                      : open
                        ? ((close - open) / open) * 100
                        : 0
                  const isUp = pct >= 0
                  return (
                    <tr key={`${row.date}-${idx}`}>
                      <td className="date">{row.date}</td>
                      <td>{formatRupiah(open)}</td>
                      <td>{formatRupiah(row.highPrice ?? row.price)}</td>
                      <td>{formatRupiah(row.lowPrice ?? row.price)}</td>
                      <td>{formatRupiah(close)}</td>
                      <td>
                        {row.volume != null
                          ? row.volume.toLocaleString('id-ID')
                          : '—'}
                      </td>
                      <td className={isUp ? 'up' : 'down'}>
                        {isUp ? '▲' : '▼'} {Math.abs(pct).toFixed(2)}%
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
          <div className="tbl-pagination">
            <p>Menampilkan {history.length} data</p>
          </div>
        </div>
      </div>

      <FooterSimple />
    </>
  )
}

export default Grafik
