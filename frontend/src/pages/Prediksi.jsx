import { useState } from 'react'
import Navbar from '../components/Navbar'
import FooterSimple from '../components/FooterSimple'
import './Prediksi.css'

function Prediksi() {
  const [showResult, setShowResult] = useState(false)

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="eyebrow">Fitur Utama</div>
        <h1>Prediksi Harga Emas AI</h1>
        <p>Masukkan data emas Anda dan dapatkan prediksi harga serta rekomendasi beli/jual berbasis AI</p>
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
                  <input type="number" placeholder="Contoh: 10" />
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
                <select className="select-field">
                  <option>7 Hari ke depan</option>
                  <option>14 Hari ke depan</option>
                  <option>30 Hari ke depan</option>
                  <option>90 Hari ke depan</option>
                </select>
              </div>

              <button className="submit-btn" onClick={() => setShowResult(true)}>Dapatkan Prediksi →</button>

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
                <div className="empty-icon">🤖</div>
                <h3>Belum ada prediksi</h3>
                <p>Isi form di sebelah kiri dan tekan "Dapatkan Prediksi" untuk melihat hasilnya di sini.</p>
              </div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                <div className="result-main">
                  <div className="rm-label">Prediksi Harga (7 Hari)</div>
                  <div className="rm-price">Rp 2.780.000<span className="rm-unit">/gr</span></div>
                  <div className="rm-sub">Estimasi harga · 24 Mei 2026</div>
                  <div className="rm-badge">▲ Potensi naik +3,0% dari harga saat ini</div>
                </div>

                <div className="result-row">
                  <div className="result-mini">
                    <div className="rmi-label">Nilai Portofolio Kini</div>
                    <div className="rmi-val">Rp 27.000.000</div>
                    <div className="rmi-sub">10 gram × Rp 2.700.000</div>
                  </div>
                  <div className="result-mini">
                    <div className="rmi-label">Estimasi 7 Hari</div>
                    <div className="rmi-val" style={{color:'#16a34a'}}>Rp 27.800.000</div>
                    <div className="rmi-sub">Selisih +Rp 800.000</div>
                  </div>
                </div>

                <div className="rec-card">
                  <div className="rec-title">Rekomendasi AI</div>
                  <div className="rec-item">
                    <div className="rec-dot-wrap"><div className="rec-dot buy"></div></div>
                    <div className="rec-content">
                      <div className="rec-head">Pertimbangkan Beli</div>
                      <div className="rec-body">Tren menunjukkan potensi kenaikan dalam 7 hari ke depan. Momentum positif dari data historis 30 hari terakhir mendukung posisi beli.</div>
                    </div>
                  </div>
                  <div className="rec-item">
                    <div className="rec-dot-wrap"><div className="rec-dot hold"></div></div>
                    <div className="rec-content">
                      <div className="rec-head">Atau Tahan Posisi</div>
                      <div className="rec-body">Jika sudah memiliki emas, tahan posisi dan pantau perkembangan lebih lanjut. Tidak ada sinyal kuat untuk exit saat ini.</div>
                    </div>
                  </div>
                  <div className="rec-item">
                    <div className="rec-dot-wrap"><div className="rec-dot sell"></div></div>
                    <div className="rec-content">
                      <div className="rec-head">Hindari Jual Sekarang</div>
                      <div className="rec-body">Tidak disarankan menjual dalam jangka pendek berdasarkan pola pergerakan harga saat ini.</div>
                    </div>
                  </div>
                  <div className="confidence">
                    <div className="conf-label">Tingkat Kepercayaan Model AI</div>
                    <div className="conf-bar-track"><div className="conf-bar-fill" style={{width:'73%'}}></div></div>
                    <div className="conf-pct">73% confidence</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <FooterSimple />
    </>
  )
}

export default Prediksi
