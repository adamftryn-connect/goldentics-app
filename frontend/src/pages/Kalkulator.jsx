import { useState } from 'react'
import Navbar from '../components/Navbar'
import FooterSimple from '../components/FooterSimple'

const PRICE = 2700000

function Kalkulator() {
  const [mode, setMode] = useState('emas') // 'emas' | 'uang'
  const [gram, setGram] = useState('10')
  const [uang, setUang] = useState('5000000')

  const totalEmas = (parseFloat(gram) || 0) * PRICE
  const totalGram = ((parseFloat(uang) || 0) / PRICE).toFixed(2)

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="eyebrow">Simulasi Harga</div>
        <h1>Kalkulator Harga Emas</h1>
        <p>Hitung nilai emas Anda dalam rupiah atau dolar secara instan berdasarkan harga pasar terkini</p>
      </div>

      <div className="main">
        <div className="mode-toggle">
          <button className={'mode-btn' + (mode === 'emas' ? ' active' : '')} onClick={() => setMode('emas')}>Emas → Uang</button>
          <button className={'mode-btn' + (mode === 'uang' ? ' active' : '')} onClick={() => setMode('uang')}>Uang → Emas</button>
        </div>

        <div className="calc-grid">
          <div>
            {/* Card Emas → Uang */}
            {mode === 'emas' && (
              <div className="calc-card">
                <h2>Emas → Rupiah / Dolar</h2>
                <p className="sub">Masukkan jumlah emas untuk mengetahui nilainya saat ini</p>

                <div className="field">
                  <label>Jumlah Emas</label>
                  <div className="input-wrap">
                    <input type="number" placeholder="0" value={gram} onChange={e => setGram(e.target.value)} />
                    <span className="unit">gram</span>
                  </div>
                </div>

                <div className="field">
                  <label>Tampilkan dalam</label>
                  <select className="select-solo">
                    <option>Rupiah (IDR)</option>
                    <option>Dolar AS (USD)</option>
                  </select>
                </div>

                <div className="result-box">
                  <div className="r-lbl">Nilai Estimasi</div>
                  <div className="r-val">Rp {totalEmas.toLocaleString('id-ID')}</div>
                  <div className="r-sub">{gram || 0} gram × Rp {PRICE.toLocaleString('id-ID')}/gr</div>
                </div>

                <div className="info-rows">
                  <div className="info-row"><span>Harga/gram (IDR)</span><strong>Rp 2.700.000</strong></div>
                  <div className="info-row"><span>Harga/gram (USD)</span><strong>$ 165,85</strong></div>
                  <div className="info-row"><span>Kurs USD/IDR</span><strong>Rp 16.280</strong></div>
                  <div className="info-row"><span>Sumber data</span><strong>Logam Mulia Antam</strong></div>
                </div>
                <p className="note">* Harga bersifat estimasi. Harga aktual dapat berbeda tergantung spread penjual (3–7%).</p>
              </div>
            )}

            {/* Card Uang → Emas */}
            {mode === 'uang' && (
              <div className="calc-card">
                <h2>Rupiah / Dolar → Emas</h2>
                <p className="sub">Berapa gram emas yang bisa Anda beli dengan uang yang dimiliki?</p>

                <div className="field">
                  <label>Jumlah Uang</label>
                  <div className="input-wrap">
                    <input type="number" placeholder="0" value={uang} onChange={e => setUang(e.target.value)} />
                    <span className="unit">IDR</span>
                  </div>
                </div>

                <div className="field">
                  <label>Mata uang</label>
                  <select className="select-solo">
                    <option>Rupiah (IDR)</option>
                    <option>Dolar AS (USD)</option>
                  </select>
                </div>

                <div className="result-box">
                  <div className="r-lbl">Emas yang Dapat Dibeli</div>
                  <div className="r-val">{totalGram} gram</div>
                  <div className="r-sub">Rp {(parseFloat(uang) || 0).toLocaleString('id-ID')} ÷ Rp {PRICE.toLocaleString('id-ID')}/gr</div>
                </div>

                <div className="info-rows">
                  <div className="info-row"><span>Setara troy ounce</span><strong>{(parseFloat(totalGram) / 31.1035).toFixed(3)} oz</strong></div>
                  <div className="info-row"><span>Setara miligram</span><strong>{Math.round(parseFloat(totalGram) * 1000).toLocaleString('id-ID')} mg</strong></div>
                  <div className="info-row"><span>Nilai buyback est.</span><strong>Rp {Math.round((parseFloat(uang) || 0) * 0.93).toLocaleString('id-ID')}</strong></div>
                  <div className="info-row"><span>Diperbarui</span><strong>Hari ini, 09.00 WIB</strong></div>
                </div>
                <p className="note">* Perhitungan menggunakan harga Logam Mulia Antam terkini. Harga buyback biasanya 7–10% lebih rendah.</p>
              </div>
            )}
          </div>

          {/* Kanan: referensi harga + kurs */}
          <div>
            <div className="ref-card">
              <h2>Referensi Harga Antam</h2>
              <p className="sub">Harga beli resmi Logam Mulia hari ini</p>
              <table className="ref-table">
                <thead>
                  <tr><th>Satuan</th><th>Harga Beli</th><th>Harga Jual</th></tr>
                </thead>
                <tbody>
                  <tr><td>0,5 gram</td><td>Rp 1.476.000</td><td className="gold">Rp 1.350.000</td></tr>
                  <tr><td>1 gram</td><td>Rp 2.700.000</td><td className="gold">Rp 2.580.000</td></tr>
                  <tr><td>2 gram</td><td>Rp 5.340.000</td><td className="gold">Rp 5.160.000</td></tr>
                  <tr><td>5 gram</td><td>Rp 13.250.000</td><td className="gold">Rp 12.900.000</td></tr>
                  <tr><td>10 gram</td><td>Rp 26.400.000</td><td className="gold">Rp 25.800.000</td></tr>
                  <tr><td>25 gram</td><td>Rp 65.750.000</td><td className="gold">Rp 64.500.000</td></tr>
                  <tr><td>50 gram</td><td>Rp 131.000.000</td><td className="gold">Rp 129.000.000</td></tr>
                  <tr><td>100 gram</td><td>Rp 261.600.000</td><td className="gold">Rp 258.000.000</td></tr>
                </tbody>
              </table>
            </div>

            <div className="kurs-card">
              <h3>Kurs &amp; Harga Global</h3>
              <div className="kurs-rows">
                <div className="kurs-row"><span>Harga Spot (XAU/USD)</span><strong>$3.238 / oz</strong></div>
                <div className="kurs-row"><span>Kurs USD/IDR</span><strong>Rp 16.280</strong></div>
                <div className="kurs-row"><span>Perubahan hari ini</span><strong className="up">▲ +$12 (+0,37%)</strong></div>
                <div className="kurs-row"><span>Tertinggi 52 minggu</span><strong>$3.500</strong></div>
                <div className="kurs-row"><span>Terendah 52 minggu</span><strong>$1.820</strong></div>
              </div>
              <p className="kurs-updated">Diperbarui: 17 Mei 2026, 09.00 WIB</p>
            </div>
          </div>
        </div>
      </div>

      <FooterSimple />
    </>
  )
}

export default Kalkulator
