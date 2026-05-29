import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import FooterSimple from '../components/FooterSimple'
import { getLatestGoldPrice } from '../api/goldenticsApi.js'
import { FALLBACK_PRICE_PER_GRAM } from '../config/defaults.js'
import { formatRupiah } from '../utils/format.js'
import './Kalkulator.css'

function formatUpdatedLabel(dateStr) {
  if (!dateStr) return null
  const d = new Date(`${dateStr}T12:00:00`)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function Kalkulator() {
  const [mode, setMode] = useState('emas')
  const [gram, setGram] = useState('10')
  const [uang, setUang] = useState('5000000')
  const [latestGold, setLatestGold] = useState(null)
  const [priceLoading, setPriceLoading] = useState(true)
  const [priceError, setPriceError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setPriceLoading(true)
    setPriceError(null)
    getLatestGoldPrice()
      .then((data) => {
        if (!cancelled) setLatestGold(data)
      })
      .catch((e) => {
        if (!cancelled) {
          setLatestGold(null)
          setPriceError(e?.message || 'Gagal memuat harga emas')
        }
      })
      .finally(() => {
        if (!cancelled) setPriceLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const pricePerGram = useMemo(() => {
    const fromApi = Number(latestGold?.pricePerGram ?? latestGold?.price)
    if (fromApi > 0) return fromApi
    return FALLBACK_PRICE_PER_GRAM
  }, [latestGold])

  const updatedLabel = useMemo(() => {
    const formatted = formatUpdatedLabel(latestGold?.date)
    if (formatted) return `Diperbarui: ${formatted}`
    if (priceLoading) return 'Memuat harga terbaru…'
    if (priceError) return 'Menggunakan harga estimasi (offline)'
    return null
  }, [latestGold, priceLoading, priceError])

  const sourceLabel = latestGold?.source === 'logammulia'
    ? 'Logam Mulia Antam'
    : latestGold?.source ?? 'Logam Mulia Antam'

  const totalEmas = (parseFloat(gram) || 0) * pricePerGram
  const totalGram =
    pricePerGram > 0
      ? ((parseFloat(uang) || 0) / pricePerGram).toFixed(2)
      : '0.00'

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="wrap2">
          <div className="eyebrow">Simulasi Harga</div>
          <h1>Kalkulator Harga Emas</h1>
          <p>
            Hitung nilai emas Anda dalam rupiah secara instan berdasarkan harga pasar terkini
          </p>
        </div>
      </div>

      <div className="main">
        <div className="mode-toggle">
          <button
            type="button"
            className={'mode-btn' + (mode === 'emas' ? ' active' : '')}
            onClick={() => setMode('emas')}
          >
            Emas → Uang
          </button>
          <button
            type="button"
            className={'mode-btn' + (mode === 'uang' ? ' active' : '')}
            onClick={() => setMode('uang')}
          >
            Uang → Emas
          </button>
        </div>

        <div className="calc-grid">
          <div>
            {mode === 'emas' && (
              <div className="calc-card">
                <h2>Emas → Rupiah</h2>
                <p className="sub">Masukkan jumlah emas untuk mengetahui nilainya saat ini</p>

                <div className="field">
                  <label>Jumlah Emas</label>
                  <div className="input-wrap">
                    <input
                      type="number"
                      placeholder="0"
                      value={gram}
                      onChange={(e) => setGram(e.target.value)}
                      min="0"
                      step="any"
                    />
                    <span className="unit">gram</span>
                  </div>
                </div>

                <div className="result-box">
                  <div className="r-lbl">Nilai Estimasi</div>
                  <div className="r-val">
                    {priceLoading ? 'Memuat…' : formatRupiah(totalEmas)}
                  </div>
                  <div className="r-sub">
                    {gram || 0} gram × {formatRupiah(pricePerGram)}/gr
                  </div>
                </div>

                <div className="info-rows">
                  <div className="info-row">
                    <span>Harga/gram (IDR)</span>
                    <strong>{priceLoading ? '…' : formatRupiah(pricePerGram)}</strong>
                  </div>
                  <div className="info-row">
                    <span>Sumber data</span>
                    <strong>{sourceLabel}</strong>
                  </div>
                  {updatedLabel ? (
                    <div className="info-row">
                      <span>Data harga</span>
                      <strong>{updatedLabel}</strong>
                    </div>
                  ) : null}
                </div>
                <p className="note">
                  * Harga bersifat estimasi. Harga aktual dapat berbeda tergantung spread penjual
                  (3–7%).
                </p>
              </div>
            )}

            {mode === 'uang' && (
              <div className="calc-card">
                <h2>Rupiah → Emas</h2>
                <p className="sub">
                  Berapa gram emas yang bisa Anda beli dengan uang yang dimiliki?
                </p>

                <div className="field">
                  <label>Jumlah Uang</label>
                  <div className="input-wrap">
                    <input
                      type="number"
                      placeholder="0"
                      value={uang}
                      onChange={(e) => setUang(e.target.value)}
                      min="0"
                      step="1"
                    />
                    <span className="unit">IDR</span>
                  </div>
                </div>

                <div className="result-box">
                  <div className="r-lbl">Emas yang Dapat Dibeli</div>
                  <div className="r-val">{priceLoading ? 'Memuat…' : `${totalGram} gram`}</div>
                  <div className="r-sub">
                    {formatRupiah(parseFloat(uang) || 0)} ÷ {formatRupiah(pricePerGram)}/gr
                  </div>
                </div>

                <div className="info-rows">
                  <div className="info-row">
                    <span>Setara troy ounce</span>
                    <strong>{(parseFloat(totalGram) / 31.1035).toFixed(3)} oz</strong>
                  </div>
                  <div className="info-row">
                    <span>Setara miligram</span>
                    <strong>
                      {Math.round(parseFloat(totalGram) * 1000).toLocaleString('id-ID')} mg
                    </strong>
                  </div>
                  <div className="info-row">
                    <span>Nilai buyback est.</span>
                    <strong>
                      Rp {Math.round((parseFloat(uang) || 0) * 0.93).toLocaleString('id-ID')}
                    </strong>
                  </div>
                  <div className="info-row">
                    <span>Harga/gram (IDR)</span>
                    <strong>{priceLoading ? '…' : formatRupiah(pricePerGram)}</strong>
                  </div>
                  {updatedLabel ? (
                    <div className="info-row">
                      <span>Data harga</span>
                      <strong>{updatedLabel}</strong>
                    </div>
                  ) : null}
                </div>
                <p className="note">
                  * Perhitungan menggunakan harga referensi terkini. Harga buyback biasanya 7–10%
                  lebih rendah.
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="ref-card">
              <h2>Referensi Harga Antam</h2>
              <p className="sub">
                {updatedLabel
                  ? `Contoh harga beli resmi Logam Mulia · ${updatedLabel}`
                  : 'Harga beli resmi Logam Mulia (contoh referensi)'}
              </p>
              <table className="ref-table">
                <thead>
                  <tr>
                    <th>Satuan</th>
                    <th>Harga Beli</th>
                    <th>Harga Jual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0,5 gram</td>
                    <td>Rp 1.476.000</td>
                    <td className="gold">Rp 1.350.000</td>
                  </tr>
                  <tr>
                    <td>1 gram</td>
                    <td>Rp 2.700.000</td>
                    <td className="gold">Rp 2.580.000</td>
                  </tr>
                  <tr>
                    <td>2 gram</td>
                    <td>Rp 5.340.000</td>
                    <td className="gold">Rp 5.160.000</td>
                  </tr>
                  <tr>
                    <td>5 gram</td>
                    <td>Rp 13.250.000</td>
                    <td className="gold">Rp 12.900.000</td>
                  </tr>
                  <tr>
                    <td>10 gram</td>
                    <td>Rp 26.400.000</td>
                    <td className="gold">Rp 25.800.000</td>
                  </tr>
                  <tr>
                    <td>25 gram</td>
                    <td>Rp 65.750.000</td>
                    <td className="gold">Rp 64.500.000</td>
                  </tr>
                  <tr>
                    <td>50 gram</td>
                    <td>Rp 131.000.000</td>
                    <td className="gold">Rp 129.000.000</td>
                  </tr>
                  <tr>
                    <td>100 gram</td>
                    <td>Rp 261.600.000</td>
                    <td className="gold">Rp 258.000.000</td>
                  </tr>
                </tbody>
              </table>
              <p className="note calc-ref-note">
                Kalkulator memakai harga referensi API ({formatRupiah(pricePerGram)}/gram). Tabel
                di atas ilustrasi spread resmi Antam.
              </p>
            </div>

            <div className="kurs-card">
              <h3>Kurs &amp; Harga Global</h3>
              <div className="kurs-rows">
                <div className="kurs-row">
                  <span>Harga Spot (XAU/USD)</span>
                  <strong>$3.238 / oz</strong>
                </div>
                <div className="kurs-row">
                  <span>Kurs USD/IDR</span>
                  <strong>Rp 16.280</strong>
                </div>
                <div className="kurs-row">
                  <span>Perubahan hari ini</span>
                  <strong className="up">▲ +$12 (+0,37%)</strong>
                </div>
                <div className="kurs-row">
                  <span>Tertinggi 52 minggu</span>
                  <strong>$3.500</strong>
                </div>
                <div className="kurs-row">
                  <span>Terendah 52 minggu</span>
                  <strong>$1.820</strong>
                </div>
              </div>
              <p className="kurs-updated">
                {updatedLabel ?? 'Data kurs global: contoh referensi'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <FooterSimple />
    </>
  )
}

export default Kalkulator
