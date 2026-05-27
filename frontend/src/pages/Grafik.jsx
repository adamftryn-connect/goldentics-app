import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import StatsBar from '../components/StatsBar'
import FooterSimple from '../components/FooterSimple'
import { getGoldHistory, getLatestGoldPrice } from '../api/goldenticsApi.js'
import { formatRupiah } from '../utils/format.js'
import './Grafik.css'

const TABS = ['7 Hari', '1 Bulan', '3 Bulan', '1 Tahun']

function Grafik() {
  const [activeTab, setActiveTab] = useState('7 Hari')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])
  const [latest, setLatest] = useState(null)

  const limitByTab = useMemo(() => {
    if (activeTab === '7 Hari') return 7
    if (activeTab === '1 Bulan') return 12
    if (activeTab === '3 Bulan') return 16
    return 24
  }, [activeTab])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [hist, latestPrice] = await Promise.all([
          getGoldHistory({ period: 'monthly' }),
          getLatestGoldPrice(),
        ])

        if (cancelled) return
        const sliced = Array.isArray(hist) ? hist.slice(-limitByTab) : []
        setHistory(sliced)
        setLatest(latestPrice)
      } catch (e) {
        if (cancelled) return
        setError(e?.message || 'Gagal memuat data histori')
        setHistory([])
        setLatest(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [activeTab, limitByTab])

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="wrap2">
          <div className="eyebrow">Data Real-time</div>
          <h1>Grafik &amp; Histori Harga Emas</h1>
          <p>Pantau pergerakan harga emas secara real-time dan analisis data historis</p>
        </div>
      </div>

      <StatsBar latest={latest} loading={loading} error={error} />

      <div className="main-grafik">
        <div className="main-grid">
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title">Grafik Harga Emas</div>
                <div className="chart-sub">Pantau pergerakan harga secara real-time</div>
              </div>
              <div className="filter-tabs">
                {TABS.map(t => (
                  <button key={t} className={'tab' + (activeTab === t ? ' active' : '')} onClick={() => setActiveTab(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="chart-wrap">
              <div className="chart-tooltip">Rp 2.780.000</div>
              <svg viewBox="0 0 860 240" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9910A" stopOpacity=".18"/>
                    <stop offset="100%" stopColor="#C9910A" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <line x1="40" y1="20" x2="860" y2="20" stroke="#f0f0f0" strokeWidth="1"/>
                <line x1="40" y1="70" x2="860" y2="70" stroke="#f0f0f0" strokeWidth="1"/>
                <line x1="40" y1="120" x2="860" y2="120" stroke="#f0f0f0" strokeWidth="1"/>
                <line x1="40" y1="170" x2="860" y2="170" stroke="#f0f0f0" strokeWidth="1"/>
                <text x="0" y="24" fontSize="9" fill="#bbb" fontFamily="Poppins,sans-serif">2.900</text>
                <text x="0" y="74" fontSize="9" fill="#bbb" fontFamily="Poppins,sans-serif">2.800</text>
                <text x="0" y="124" fontSize="9" fill="#bbb" fontFamily="Poppins,sans-serif">2.700</text>
                <text x="0" y="174" fontSize="9" fill="#bbb" fontFamily="Poppins,sans-serif">2.600</text>
                <path d="M40,155 C130,148 210,130 310,110 S430,130 530,95 S660,55 760,65 S830,70 860,55 L860,220 L40,220 Z" fill="url(#g1)"/>
                <path d="M40,155 C130,148 210,130 310,110 S430,130 530,95 S660,55 760,65 S830,70 860,55" fill="none" stroke="#C9910A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="310" cy="110" r="4" fill="#C9910A"/>
                <circle cx="530" cy="95" r="4" fill="#C9910A"/>
                <circle cx="860" cy="55" r="5" fill="#C9910A" stroke="#fff" strokeWidth="2"/>
                <text x="36" y="235" fontSize="9" fill="#bbb" fontFamily="Poppins,sans-serif" textAnchor="middle">01 Mei</text>
                <text x="168" y="235" fontSize="9" fill="#bbb" fontFamily="Poppins,sans-serif" textAnchor="middle">03 Mei</text>
                <text x="310" y="235" fontSize="9" fill="#bbb" fontFamily="Poppins,sans-serif" textAnchor="middle">05 Mei</text>
                <text x="530" y="235" fontSize="9" fill="#bbb" fontFamily="Poppins,sans-serif" textAnchor="middle">07 Mei</text>
                <text x="700" y="235" fontSize="9" fill="#bbb" fontFamily="Poppins,sans-serif" textAnchor="middle">09 Mei</text>
                <text x="856" y="235" fontSize="9" fill="#bbb" fontFamily="Poppins,sans-serif" textAnchor="middle">Hari ini</text>
                <line x1="860" y1="20" x2="860" y2="220" stroke="#C9910A" strokeWidth="1" strokeDasharray="4,3" opacity=".5"/>
              </svg>
            </div>
          </div>

          <div className="sidebar">
            <div className="side-card">
              <h3>Harga Saat Ini</h3>
              <div className="price-now">
                <div className="price-now-lbl">Logam Mulia Antam</div>
                <div className="price-now-val">Rp 2.700.000</div>
                <div className="price-badge">▲ +0,3% hari ini</div>
              </div>
              <div className="price-rows">
                <div className="price-row"><span className="price-row-lbl">5 gram</span><span className="price-row-val">Rp 13.500.000</span></div>
                <div className="price-row"><span className="price-row-lbl">10 gram</span><span className="price-row-val">Rp 27.000.000</span></div>
                <div className="price-row"><span className="price-row-lbl">25 gram</span><span className="price-row-val">Rp 67.500.000</span></div>
                <div className="price-row"><span className="price-row-lbl">50 gram</span><span className="price-row-val">Rp 135.000.000</span></div>
              </div>
            </div>
            <div className="side-card">
              <h3>Ringkasan Periode</h3>
              <div className="summary-rows">
                <div className="sum-row"><span className="sum-lbl">Pembukaan</span><span className="sum-val">Rp 2.640.000</span></div>
                <div className="sum-row"><span className="sum-lbl">Tertinggi</span><span className="sum-val up">Rp 2.850.000</span></div>
                <div className="sum-row"><span className="sum-lbl">Terendah</span><span className="sum-val down">Rp 2.600.000</span></div>
                <div className="sum-row"><span className="sum-lbl">Penutupan</span><span className="sum-val">Rp 2.700.000</span></div>
                <div className="sum-row"><span className="sum-lbl">Perubahan</span><span className="sum-val up">+Rp 60.000 (+2,3%)</span></div>
                <div className="sum-row"><span className="sum-lbl">Prediksi</span><span className="sum-val amber">Rp 2.780.000</span></div>
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
              <p>Data historis harga emas Logam Mulia</p>
            </div>
            <div className="search-bar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input type="text" placeholder="Cari tanggal..." />
            </div>
          </div>
          <table className="tbl">
            <thead>
              <tr>
                <th>Tanggal</th><th>Harga Open</th><th>Tertinggi</th><th>Terendah</th><th>Harga Tutup</th><th>Perubahan</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="date" colSpan={6}>Memuat data…</td></tr>
              ) : error ? (
                <tr><td className="date" colSpan={6}>{error}</td></tr>
              ) : history.length === 0 ? (
                <tr><td className="date" colSpan={6}>Tidak ada data.</td></tr>
              ) : (
                history.map((row, idx) => {
                  const open = row.openPrice ?? row.price
                  const close = row.closePrice ?? row.price
                  const change = open ? ((close - open) / open) * 100 : 0
                  const isUp = change >= 0
                  return (
                    <tr key={`${row.date}-${idx}`}>
                      <td className="date">{row.date}</td>
                      <td>{formatRupiah(open)}</td>
                      <td>{formatRupiah(row.highPrice ?? row.price)}</td>
                      <td>{formatRupiah(row.lowPrice ?? row.price)}</td>
                      <td>{formatRupiah(close)}</td>
                      <td className={isUp ? 'up' : 'down'}>
                        {isUp ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
          <div className="tbl-pagination">
            <p>Menampilkan {history.length} data</p>
            <div className="pg-btns">
              <button className="pg-btn active">1</button>
              <button className="pg-btn">2</button>
              <button className="pg-btn">3</button>
              <button className="pg-btn">...</button>
              <button className="pg-btn">37</button>
            </div>
          </div>
        </div>
      </div>

      <FooterSimple />
    </>
  )
}

export default Grafik
