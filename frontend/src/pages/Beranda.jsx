import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Beranda() {
  const navigate = useNavigate()

  return (
    <div className="page-beranda">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">🔮 Prediksi Cerdas Harga Emas</div>
          <h1>Analisis &amp; Prediksi<br />Harga Emas<br /><em>dengan AI.</em></h1>
          <p className="hero-desc">Dapatkan insight harga emas harian dengan teknologi AI dan data historis untuk keputusan investasi lebih cerdas.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/prediksi')}>Lihat Prediksi →</button>
            <button className="btn-secondary" onClick={() => navigate('/grafik')}>Lihat Histori</button>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-blob-deco"></div>
          <div className="ticker-card">
            <div className="ticker-lbl">Harga Emas Logam Mulia</div>
            <div className="ticker-price">Rp 2.700.000</div>
            <div className="ticker-sub">per gram · diperbarui hari ini</div>
            <div className="ticker-badge">▲ +0,3% dari kemarin</div>
            <div className="t-rows">
              <div className="t-row"><span className="t-lbl">1 gr</span><div className="t-track"><div className="t-fill" style={{width:'35%'}}></div></div><span className="t-val">Rp 2.700.000</span></div>
              <div className="t-row"><span className="t-lbl">5 gr</span><div className="t-track"><div className="t-fill" style={{width:'56%'}}></div></div><span className="t-val">Rp 13.500.000</span></div>
              <div className="t-row"><span className="t-lbl">10 gr</span><div className="t-track"><div className="t-fill" style={{width:'74%'}}></div></div><span className="t-val">Rp 27.000.000</span></div>
              <div className="t-row"><span className="t-lbl">25 gr</span><div className="t-track"><div className="t-fill" style={{width:'100%'}}></div></div><span className="t-val">Rp 67.500.000</span></div>
            </div>
          </div>
          <div className="mini-stats">
            <div className="ms-item">
              <div className="ms-val gold">Rp 2.850.000</div>
              <div className="ms-lbl">Tertinggi 7 hari</div>
            </div>
            <div className="ms-item">
              <div className="ms-val">426 lot</div>
              <div className="ms-lbl">Volume 24j</div>
            </div>
            <div className="ms-item">
              <div className="ms-val green">+3,0%</div>
              <div className="ms-lbl">Prediksi 7 hari</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="sb-item">
          <div className="sb-lbl">Harga Hari Ini</div>
          <div className="sb-val">Rp 2.700.000/gr</div>
          <div className="sb-chg up">▲ +0,3% dari kemarin</div>
        </div>
        <div className="sb-item">
          <div className="sb-lbl">Volume 24 Jam</div>
          <div className="sb-val">426 lot</div>
          <div className="sb-chg up">▲ naik</div>
        </div>
        <div className="sb-item">
          <div className="sb-lbl">Tertinggi 7 Hari</div>
          <div className="sb-val">Rp 2.850.000/gr</div>
          <div className="sb-chg up">▲ +4,1% mingguan</div>
        </div>
        <div className="sb-item">
          <div className="sb-lbl">Prediksi 7 Hari</div>
          <div className="sb-val" style={{color:'#C9910A'}}>Rp 2.780.000/gr</div>
          <div className="sb-chg amber">▲ Potensi naik</div>
        </div>
      </div>

      {/* SECTION 1 — Fondasi */}
      <section className="edu-section bg-white">
        <div>
          <div className="sec-eyebrow">01 — Fondasi</div>
          <h2 className="sec-title">Mengapa emas tetap relevan di era digital?</h2>
          <p className="sec-desc">Emas bukan sekadar logam mulia. Selama lebih dari 3.000 tahun, emas menjadi standar nilai yang melampaui batas negara dan rezim. Di era digital sekalipun, tidak ada aset yang menandingi kestabilan emas sebagai penyimpan kekayaan jangka panjang.</p>
          <div className="sec-points">
            <div className="sec-point"><span className="point-dot"></span>Nilainya tidak bisa dicetak seperti uang fiat — jumlahnya terbatas di alam.</div>
            <div className="sec-point"><span className="point-dot"></span>Diakui secara global tanpa bergantung pada sistem keuangan satu negara.</div>
            <div className="sec-point"><span className="point-dot"></span>Tidak terkorelasi langsung dengan pasar saham — cocok untuk diversifikasi.</div>
          </div>
          <button className="sec-link">Pelajari lebih lanjut →</button>
        </div>
        <div>
          <div className="vis-gold">
            <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
              <ellipse cx="120" cy="192" rx="80" ry="7" fill="rgba(0,0,0,.08)"/>
              <g transform="translate(55,50)">
                <path d="M0 28 L14 14 L104 14 L90 28 Z" fill="#9a6d07"/>
                <rect x="0" y="28" width="90" height="50" fill="#AA7A08"/>
                <path d="M90 28 L104 14 L104 64 L90 78 Z" fill="#886009"/>
                <text x="45" y="57" fontFamily="Poppins,sans-serif" fontSize="8" fontWeight="700" fill="rgba(255,255,255,.4)" textAnchor="middle">999.9</text>
              </g>
              <g transform="translate(28,82)">
                <path d="M0 28 L14 14 L104 14 L90 28 Z" fill="#C9910A"/>
                <rect x="0" y="28" width="90" height="50" fill="#D4970C"/>
                <path d="M90 28 L104 14 L104 64 L90 78 Z" fill="#a87509"/>
                <text x="45" y="57" fontFamily="Poppins,sans-serif" fontSize="8" fontWeight="700" fill="rgba(255,255,255,.55)" textAnchor="middle">ANTAM</text>
              </g>
              <g transform="translate(0,114)">
                <path d="M0 28 L14 14 L104 14 L90 28 Z" fill="#E4A50E"/>
                <rect x="0" y="28" width="90" height="50" fill="#F0B010"/>
                <path d="M90 28 L104 14 L104 64 L90 78 Z" fill="#C9910A"/>
                <text x="45" y="57" fontFamily="Poppins,sans-serif" fontSize="8" fontWeight="700" fill="rgba(255,255,255,.65)" textAnchor="middle">1 GRAM</text>
              </g>
            </svg>
            <div style={{textAlign:'center',position:'relative',zIndex:1}}>
              <div style={{fontSize:'1.6rem',fontWeight:700,color:'#C9910A',letterSpacing:'-.03em'}}>190.000 ton</div>
              <div style={{fontSize:'.72rem',color:'#aaa',marginTop:'2px'}}>stok emas di seluruh dunia</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Harga */}
      <section className="edu-section bg-cream alt">
        <div>
          <div className="sec-eyebrow">02 — Harga</div>
          <h2 className="sec-title">Apa yang menggerakkan harga emas?</h2>
          <p className="sec-desc">Harga emas tidak bergerak secara acak. Ada faktor-faktor makroekonomi yang secara konsisten mempengaruhi nilainya — memahaminya adalah kunci investasi yang lebih cerdas.</p>
          <div className="sec-points">
            <div className="sec-point"><span className="point-dot"></span>Inflasi tinggi → daya beli uang turun → investor beralih ke emas.</div>
            <div className="sec-point"><span className="point-dot"></span>Dolar AS melemah → harga emas dalam USD lebih terjangkau → permintaan naik.</div>
            <div className="sec-point"><span className="point-dot"></span>Ketidakpastian geopolitik mendorong permintaan safe haven secara masif.</div>
          </div>
          <button className="sec-link">Lihat analisis faktor →</button>
        </div>
        <div>
          <div className="vis-factors">
            <div style={{fontSize:'.75rem',fontWeight:600,color:'#1a1a1a',marginBottom:'.1rem'}}>Pengaruh terhadap harga emas</div>
            <div style={{fontSize:'.65rem',color:'#aaa',marginBottom:'.75rem'}}>Estimasi korelasi historis</div>
            <div className="factor-row"><div className="f-icon">📈</div><div className="f-txt"><div className="f-name">Inflasi AS (CPI)</div><div className="f-desc">Korelasi positif kuat</div></div><div className="f-bar-wrap"><div className="f-bar-track"><div className="f-bar-fill" style={{width:'88%'}}></div></div><div className="f-pct">88%</div></div></div>
            <div className="factor-row"><div className="f-icon">💵</div><div className="f-txt"><div className="f-name">Indeks Dolar (DXY)</div><div className="f-desc">Korelasi negatif kuat</div></div><div className="f-bar-wrap"><div className="f-bar-track"><div className="f-bar-fill" style={{width:'80%'}}></div></div><div className="f-pct">-80%</div></div></div>
            <div className="factor-row"><div className="f-icon">🌍</div><div className="f-txt"><div className="f-name">Risiko Geopolitik</div><div className="f-desc">Pengaruh jangka pendek</div></div><div className="f-bar-wrap"><div className="f-bar-track"><div className="f-bar-fill" style={{width:'72%'}}></div></div><div className="f-pct">72%</div></div></div>
            <div className="factor-row"><div className="f-icon">🏦</div><div className="f-txt"><div className="f-name">Pembelian Bank Sentral</div><div className="f-desc">Permintaan institusional</div></div><div className="f-bar-wrap"><div className="f-bar-track"><div className="f-bar-fill" style={{width:'65%'}}></div></div><div className="f-pct">65%</div></div></div>
            <div className="factor-row"><div className="f-icon">💎</div><div className="f-txt"><div className="f-name">Permintaan Perhiasan</div><div className="f-desc">Stagnan di jangka pendek</div></div><div className="f-bar-wrap"><div className="f-bar-track"><div className="f-bar-fill" style={{width:'40%'}}></div></div><div className="f-pct">40%</div></div></div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Safe Haven */}
      <section className="edu-section bg-dark">
        <div>
          <div className="sec-eyebrow">03 — Strategi</div>
          <h2 className="sec-title">Safe haven: kenapa investor lari ke emas saat krisis?</h2>
          <p className="sec-desc">Ketika pasar bergejolak, emas justru bersinar. Ini bukan kebetulan — ini adalah perilaku yang terdokumentasi selama puluhan krisis finansial global.</p>
          <div className="sec-points">
            <div className="sec-point"><span className="point-dot"></span>Krisis 2008: S&amp;P 500 turun -38%, emas naik +5,8%.</div>
            <div className="sec-point"><span className="point-dot"></span>Pandemi 2020: emas mencatat rekor tertinggi sepanjang masa ($2.075/oz).</div>
            <div className="sec-point"><span className="point-dot"></span>Inflasi 2022–2023: emas bertahan sementara aset kripto anjlok drastis.</div>
          </div>
          <button className="sec-link light">Lihat data historis →</button>
        </div>
        <div>
          <div className="vis-safe">
            <div className="sh-card gold-bg">
              <div><div className="sh-card-label" style={{color:'rgba(255,255,255,.8)'}}>Emas saat krisis 2008</div><div className="sh-val" style={{color:'#fff'}}>+5,8%</div><div className="sh-sub" style={{color:'rgba(255,255,255,.7)'}}>saat S&amp;P 500 turun 38%</div></div>
              <span className="sh-badge white">Safe Haven</span>
            </div>
            <div className="sh-card dark-bg">
              <div><div className="sh-card-label" style={{color:'#666'}}>S&amp;P 500 (2008)</div><div className="sh-val" style={{color:'#f87171'}}>-38%</div><div className="sh-sub" style={{color:'#555'}}>penurunan terbesar sejak 1931</div></div>
              <span className="sh-badge red">Bearish</span>
            </div>
            <div className="sh-card outline">
              <div><div className="sh-card-label" style={{color:'#888'}}>Emas — ATH 2020</div><div className="sh-val" style={{color:'#C9910A'}}>$2.075</div><div className="sh-sub" style={{color:'#aaa'}}>per troy ounce</div></div>
              <span className="sh-badge green">All-time High</span>
            </div>
            <div className="sh-card cream">
              <div><div className="sh-card-label" style={{color:'#888'}}>Stabilitas vs Kripto</div><div className="sh-val" style={{color:'#C9910A'}}>3×</div><div className="sh-sub" style={{color:'#aaa'}}>lebih stabil dari Bitcoin</div></div>
              <span className="sh-badge amber">Lebih Stabil</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Membaca Harga */}
      <section className="edu-section bg-white alt">
        <div>
          <div className="sec-eyebrow">04 — Membaca Data</div>
          <h2 className="sec-title">Cara membaca harga emas: troy ounce vs gram</h2>
          <p className="sec-desc">Harga emas dunia dikutip dalam troy ounce, bukan gram biasa. Satu troy ounce setara 31,1 gram. Di Indonesia, Logam Mulia Antam mengkonversi harga tersebut ke rupiah per gram dengan menambahkan margin penjual.</p>
          <div className="sec-points">
            <div className="sec-point"><span className="point-dot"></span>1 troy ounce = 31,1035 gram — selalu gunakan angka ini untuk konversi.</div>
            <div className="sec-point"><span className="point-dot"></span>Harga Antam = harga spot × kurs USD/IDR + margin toko.</div>
            <div className="sec-point"><span className="point-dot"></span>Spread beli-jual bisa 3–7% — perhatikan selisih sebelum bertransaksi.</div>
          </div>
          <button className="sec-link" onClick={() => navigate('/kalkulator')}>Coba kalkulator →</button>
        </div>
        <div>
          <div className="vis-price">
            <div className="price-top">
              <div className="price-top-lbl">Harga Spot Global</div>
              <div className="price-top-val">$3.238 / oz</div>
              <div className="price-top-sub">≈ Rp 52.700.000 per troy ounce</div>
            </div>
            <div className="conv-row">
              <div className="conv-side"><div className="conv-lbl">Global</div><div className="conv-val">$3.238</div><div className="conv-unit">per troy oz</div></div>
              <div className="conv-arrow">→</div>
              <div className="conv-side"><div className="conv-lbl">Indonesia</div><div className="conv-val">Rp 1.695.000</div><div className="conv-unit">per gram (±)</div></div>
            </div>
            <div className="conv-row">
              <div className="conv-side"><div className="conv-lbl">Antam Jual</div><div className="conv-val">Rp 1.730.000</div><div className="conv-unit">per gram</div></div>
              <div className="conv-arrow">↔</div>
              <div className="conv-side"><div className="conv-lbl">Antam Beli</div><div className="conv-val">Rp 1.612.000</div><div className="conv-unit">per gram</div></div>
            </div>
            <div className="price-note">💡 Spread antara harga beli dan jual Antam sekitar Rp 118.000/gram (±6,8%). Ini biaya implisit yang perlu diperhitungkan sebelum investasi.</div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Tips Pemula */}
      <section className="edu-section bg-cream">
        <div>
          <div className="sec-eyebrow">05 — Pemula</div>
          <h2 className="sec-title">Mulai dari mana? Tips investasi emas pertama.</h2>
          <p className="sec-desc">Banyak yang tertarik berinvestasi emas tapi bingung memulainya. Berikut panduan praktis agar tidak salah langkah sejak awal.</p>
          <div className="sec-points">
            <div className="sec-point"><span className="point-dot"></span>Alokasi ideal: 5–15% dari total portofolio investasi.</div>
            <div className="sec-point"><span className="point-dot"></span>Pilih instrumen yang likuid dan resmi — Antam, Pegadaian, atau emas digital.</div>
            <div className="sec-point"><span className="point-dot"></span>Investasi emas paling cocok untuk horizon jangka panjang (3–10 tahun).</div>
          </div>
          <button className="sec-link" onClick={() => navigate('/prediksi')}>Coba prediksi AI →</button>
        </div>
        <div>
          <div className="vis-tips">
            <div className="tip-card"><div className="tip-num">01</div><div className="tip-text"><div className="tip-title">Tentukan tujuan investasi</div><div className="tip-desc">Lindung nilai inflasi, tabungan jangka panjang, atau diversifikasi portofolio?</div></div><div className="tip-check done">✓</div></div>
            <div className="tip-card"><div className="tip-num">02</div><div className="tip-text"><div className="tip-title">Pilih platform yang resmi &amp; terpercaya</div><div className="tip-desc">Antam, Pegadaian, atau platform digital berizin OJK.</div></div><div className="tip-check done">✓</div></div>
            <div className="tip-card"><div className="tip-num">03</div><div className="tip-text"><div className="tip-title">Mulai kecil, tambah secara konsisten</div><div className="tip-desc">Tidak perlu langsung beli banyak — cicil secara rutin lebih efektif.</div></div><div className="tip-check"></div></div>
            <div className="tip-card"><div className="tip-num">04</div><div className="tip-text"><div className="tip-title">Pantau harga, tapi jangan panik</div><div className="tip-desc">Fluktuasi harian normal. Fokus pada tren jangka panjang.</div></div><div className="tip-check"></div></div>
            <div className="tip-card"><div className="tip-num">05</div><div className="tip-text"><div className="tip-title">Gunakan alat analitik seperti Goldentics</div><div className="tip-desc">Data historis dan prediksi AI membantu keputusan lebih terstruktur.</div></div><div className="tip-check"></div></div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <div className="cta-strip">
        <div>
          <h2>Siap menganalisis emas Anda?</h2>
          <p>Gunakan prediksi AI atau kalkulator harga untuk mulai hari ini.</p>
        </div>
        <div className="cta-btns">
          <button className="btn-outline" onClick={() => navigate('/kalkulator')}>Buka Kalkulator</button>
          <button className="btn-primary" onClick={() => navigate('/prediksi')}>Coba Prediksi AI</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="f-logo">Golden<span>tics</span></div>
            <p className="f-desc">Platform analisis tren harga emas berbasis AI untuk keputusan investasi lebih cerdas.</p>
          </div>
          <div className="f-col">
            <h4>Navigasi</h4>
            <a href="#">Beranda</a><a href="#">Grafik</a><a href="#">Kalkulator</a><a href="#">Prediksi</a>
          </div>
          <div className="f-col">
            <h4>Tautan</h4>
            <a href="#">GitHub</a><a href="#">Kebijakan Privasi</a><a href="#">Syarat &amp; Ketentuan</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Goldentics — Coding Camp DBS Foundation</p>
          <div className="f-bottom-links">
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Syarat &amp; Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Beranda
