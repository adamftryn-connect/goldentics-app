import Navbar from '../components/Navbar'

function Tentang() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className="about-hero">
        <div className="ah-left">
          <div className="eyebrow">Tentang Proyek</div>
          <h1>Goldentics —<br />dibangun dengan data,<br /><em>untuk investor.</em></h1>
          <p>Goldentics adalah proyek capstone Coding Camp DBS Foundation yang menghadirkan analitik harga emas berbasis AI — mudah diakses, transparan, dan bermanfaat untuk semua kalangan investor.</p>
          <div className="ah-badges">
            <span className="ah-badge">Capstone Project</span>
            <span className="ah-badge">DBS Foundation</span>
            <span className="ah-badge">2026</span>
          </div>
        </div>
        <div className="ah-right">
          <div className="project-visual">
            <div className="pv-bar">
              <div className="pv-dot"></div><div className="pv-dot"></div><div className="pv-dot"></div>
            </div>
            <div className="pv-rows">
              <div className="pv-row"><span className="pv-key">Frontend</span><div className="pv-val-bar" style={{background:'#C9910A',opacity:.8}}></div><span className="pv-val-text" style={{color:'#C9910A'}}>React</span></div>
              <div className="pv-row"><span className="pv-key">Backend</span><div className="pv-val-bar" style={{background:'#4ade80',opacity:.7}}></div><span className="pv-val-text" style={{color:'#4ade80'}}>Node.js</span></div>
              <div className="pv-row"><span className="pv-key">AI Model</span><div className="pv-val-bar" style={{background:'#60a5fa',opacity:.7}}></div><span className="pv-val-text" style={{color:'#60a5fa'}}>HuggingFace</span></div>
              <div className="pv-row"><span className="pv-key">Data</span><div className="pv-val-bar" style={{background:'#f472b6',opacity:.7}}></div><span className="pv-val-text" style={{color:'#f472b6'}}>Antam API</span></div>
              <div className="pv-row"><span className="pv-key">Charts</span><div className="pv-val-bar" style={{background:'#a78bfa',opacity:.7}}></div><span className="pv-val-text" style={{color:'#a78bfa'}}>Recharts</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* TIM PENGEMBANG */}
      <div className="section">
        <div className="eyebrow">Tim Pengembang</div>
        <div className="section-title">Dibuat oleh</div>
        <p className="section-sub">Tim developer Coding Camp DBS Foundation Batch 2026</p>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">👤</div>
            <div className="team-name">Nama Developer 1</div>
            <div className="team-role">Frontend Developer</div>
            <div className="team-desc">Bertanggung jawab atas desain UI/UX dan implementasi React — memastikan pengalaman pengguna yang intuitif dan responsif.</div>
            <div className="team-links">
              <a href="#" className="team-link">gh</a>
              <a href="#" className="team-link">in</a>
            </div>
          </div>
          <div className="team-card">
            <div className="team-avatar">👤</div>
            <div className="team-name">Nama Developer 2</div>
            <div className="team-role">Backend Developer</div>
            <div className="team-desc">Membangun REST API dengan Node.js &amp; Express, mengelola data harga emas, dan mengintegrasikan model AI ke pipeline backend.</div>
            <div className="team-links">
              <a href="#" className="team-link">gh</a>
              <a href="#" className="team-link">in</a>
            </div>
          </div>
          <div className="team-card">
            <div className="team-avatar">👤</div>
            <div className="team-name">Nama Developer 3</div>
            <div className="team-role">Data &amp; AI Engineer</div>
            <div className="team-desc">Mengembangkan model prediksi berbasis HuggingFace, mengelola dataset historis, dan memvalidasi akurasi output model AI.</div>
            <div className="team-links">
              <a href="#" className="team-link">gh</a>
              <a href="#" className="team-link">in</a>
            </div>
          </div>
        </div>
      </div>

      {/* TECH STACK DARK */}
      <div className="dark-section">
        <div className="inner">
          <div className="eyebrow">Stack Teknologi</div>
          <div className="section-title" style={{color:'#fff',marginBottom:'.25rem'}}>Teknologi yang Digunakan</div>
          <p className="section-sub" style={{marginBottom:'1.75rem'}}>Dibangun dengan teknologi modern yang scalable dan maintainable</p>
          <div className="stack-grid">
            <div className="stack-item"><div className="stack-icon">⚛️</div><div><div className="stack-name">React + Vite</div><div className="stack-role">Frontend Framework &amp; Build Tool</div></div></div>
            <div className="stack-item"><div className="stack-icon">🟢</div><div><div className="stack-name">Node.js + Express</div><div className="stack-role">Backend REST API</div></div></div>
            <div className="stack-item"><div className="stack-icon">🤗</div><div><div className="stack-name">HuggingFace Inference</div><div className="stack-role">Model Prediksi AI</div></div></div>
            <div className="stack-item"><div className="stack-icon">📊</div><div><div className="stack-name">Recharts</div><div className="stack-role">Visualisasi Data Interaktif</div></div></div>
            <div className="stack-item"><div className="stack-icon">🎨</div><div><div className="stack-name">Tailwind CSS</div><div className="stack-role">Styling &amp; Design System</div></div></div>
            <div className="stack-item"><div className="stack-icon">📦</div><div><div className="stack-name">REST API</div><div className="stack-role">Komunikasi Frontend–Backend</div></div></div>
            <div className="stack-item"><div className="stack-icon">📈</div><div><div className="stack-name">Logam Mulia / Antam</div><div className="stack-role">Sumber Data Harga Emas</div></div></div>
            <div className="stack-item"><div className="stack-icon">🚀</div><div><div className="stack-name">Vercel + Railway</div><div className="stack-role">Deployment &amp; Hosting</div></div></div>
          </div>
        </div>
      </div>

      {/* INFO PROYEK */}
      <div className="section">
        <div className="eyebrow">Detail Proyek</div>
        <div className="section-title">Informasi Proyek</div>
        <p className="section-sub">Metadata dan tautan terkait proyek Goldentics</p>
        <div className="info-grid">
          <div className="info-card">
            <h3>Informasi Umum</h3>
            <div className="about-info-rows">
              <div className="about-info-row"><span>Program</span><strong>Coding Camp DBS Foundation</strong></div>
              <div className="about-info-row"><span>Tahun</span><strong>2026</strong></div>
              <div className="about-info-row"><span>Kategori</span><strong>Capstone Project</strong></div>
              <div className="about-info-row"><span>Lisensi</span><strong>ISC License</strong></div>
              <div className="about-info-row"><span>Status</span><strong style={{color:'#16a34a'}}>● Aktif</strong></div>
            </div>
          </div>
          <div className="info-card">
            <h3>Tautan Proyek</h3>
            <div className="about-info-rows">
              <div className="about-info-row"><span>Repository</span><a href="#">github.com/goldentics</a></div>
              <div className="about-info-row"><span>Live Demo</span><a href="#">goldentics.vercel.app</a></div>
              <div className="about-info-row"><span>API Docs</span><a href="#">goldentics/api-docs</a></div>
              <div className="about-info-row"><span>Kontak</span><a href="#">team@goldentics.id</a></div>
              <div className="about-info-row"><span>Instagram</span><a href="#">@goldentics_id</a></div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER FULL */}
      <footer style={{background:'#1a1a1a',padding:'2.5rem 5% 1.5rem'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',gap:'2rem',marginBottom:'1.75rem',flexWrap:'wrap'}}>
            <div>
              <div style={{fontWeight:700,fontSize:'1rem',color:'#fff'}}>Golden<span style={{color:'#C9910A'}}>tics</span></div>
              <p style={{fontSize:'.72rem',color:'#555',marginTop:'.4rem',maxWidth:'200px',lineHeight:1.7}}>Platform analisis tren harga emas berbasis AI.</p>
            </div>
            <div>
              <h4 style={{fontSize:'.62rem',fontWeight:600,color:'#444',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'.7rem'}}>Navigasi</h4>
              <div style={{display:'flex',flexDirection:'column',gap:'.35rem'}}>
                <a href="#" style={{fontSize:'.75rem',color:'#666',textDecoration:'none'}}>Beranda</a>
                <a href="#" style={{fontSize:'.75rem',color:'#666',textDecoration:'none'}}>Grafik</a>
                <a href="#" style={{fontSize:'.75rem',color:'#666',textDecoration:'none'}}>Kalkulator</a>
                <a href="#" style={{fontSize:'.75rem',color:'#666',textDecoration:'none'}}>Prediksi</a>
              </div>
            </div>
            <div>
              <h4 style={{fontSize:'.62rem',fontWeight:600,color:'#444',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'.7rem'}}>Tautan</h4>
              <div style={{display:'flex',flexDirection:'column',gap:'.35rem'}}>
                <a href="#" style={{fontSize:'.75rem',color:'#666',textDecoration:'none'}}>GitHub</a>
                <a href="#" style={{fontSize:'.75rem',color:'#666',textDecoration:'none'}}>Kebijakan Privasi</a>
                <a href="#" style={{fontSize:'.75rem',color:'#666',textDecoration:'none'}}>Syarat &amp; Ketentuan</a>
              </div>
            </div>
          </div>
          <div style={{borderTop:'1px solid #222',paddingTop:'1.25rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'.5rem'}}>
            <p style={{fontSize:'.7rem',color:'#444'}}>© 2026 Goldentics — Coding Camp DBS Foundation</p>
            <div style={{display:'flex',gap:'1.25rem'}}>
              <a href="#" style={{fontSize:'.7rem',color:'#444',textDecoration:'none'}}>Kebijakan Privasi</a>
              <a href="#" style={{fontSize:'.7rem',color:'#444',textDecoration:'none'}}>Syarat &amp; Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Tentang
