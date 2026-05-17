import { useState } from 'react'
import Navbar from '../components/Navbar'
import FooterSimple from '../components/FooterSimple'
import './Grafik.css'

const TABS = ['7 Hari', '1 Bulan', '3 Bulan', '1 Tahun']

function Grafik() {
  const [activeTab, setActiveTab] = useState('7 Hari')

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

      <div className="stats-row">
        <div className="sr-item"><div className="sr-lbl">Harga Hari Ini</div><div className="sr-val">Rp 2.700.000/gr</div><div className="sr-chg up">▲ +0,3% dari kemarin</div></div>
        <div className="sr-item"><div className="sr-lbl">Volume 24 Jam</div><div className="sr-val">426 lot</div><div className="sr-chg up">▲ naik</div></div>
        <div className="sr-item"><div className="sr-lbl">Tertinggi 7 Hari</div><div className="sr-val">Rp 2.850.000/gr</div><div className="sr-chg up">▲ +4,1% mingguan</div></div>
        <div className="sr-item"><div className="sr-lbl">Prediksi 7 Hari</div><div className="sr-val" style={{color:'#C9910A'}}>Rp 2.780.000/gr</div><div className="sr-chg amber">▲ Potensi naik</div></div>
      </div>

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
              <tr><td className="date">07 Mei 2026</td><td>Rp 2.513.896</td><td>Rp 2.613.896</td><td>Rp 2.500.000</td><td>Rp 2.580.000</td><td className="down">▼ -0,3%</td></tr>
              <tr><td className="date">06 Mei 2026</td><td>Rp 2.480.000</td><td>Rp 2.530.000</td><td>Rp 2.470.000</td><td>Rp 2.513.896</td><td className="up">▲ +0,1%</td></tr>
              <tr><td className="date">05 Mei 2026</td><td>Rp 2.450.000</td><td>Rp 2.495.000</td><td>Rp 2.440.000</td><td>Rp 2.480.000</td><td className="up">▲ +0,4%</td></tr>
              <tr><td className="date">04 Mei 2026</td><td>Rp 2.470.000</td><td>Rp 2.480.000</td><td>Rp 2.440.000</td><td>Rp 2.450.000</td><td className="down">▼ -0,5%</td></tr>
              <tr><td className="date">03 Mei 2026</td><td>Rp 2.440.000</td><td>Rp 2.475.000</td><td>Rp 2.430.000</td><td>Rp 2.470.000</td><td className="up">▲ +0,2%</td></tr>
              <tr><td className="date">02 Mei 2026</td><td>Rp 2.420.000</td><td>Rp 2.460.000</td><td>Rp 2.410.000</td><td>Rp 2.440.000</td><td className="up">▲ +0,6%</td></tr>
              <tr><td className="date">01 Mei 2026</td><td>Rp 2.390.000</td><td>Rp 2.430.000</td><td>Rp 2.380.000</td><td>Rp 2.420.000</td><td className="up">▲ +0,3%</td></tr>
              <tr><td className="date">30 Apr 2026</td><td>Rp 2.410.000</td><td>Rp 2.420.000</td><td>Rp 2.370.000</td><td>Rp 2.390.000</td><td className="down">▼ -0,2%</td></tr>
              <tr><td className="date">29 Apr 2026</td><td>Rp 2.380.000</td><td>Rp 2.415.000</td><td>Rp 2.375.000</td><td>Rp 2.410.000</td><td className="up">▲ +0,7%</td></tr>
              <tr><td className="date">28 Apr 2026</td><td>Rp 2.360.000</td><td>Rp 2.390.000</td><td>Rp 2.350.000</td><td>Rp 2.380.000</td><td className="up">▲ +0,4%</td></tr>
            </tbody>
          </table>
          <div className="tbl-pagination">
            <p>Menampilkan 1–10 dari 365 data</p>
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
