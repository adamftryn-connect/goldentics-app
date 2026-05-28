import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FooterSimple from '../components/FooterSimple'
import { loginUser } from '../api/goldenticsApi.js'
import { emitAuthChanged } from '../utils/authEvents.js'
import './Auth.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('goldentics_token')
    if (token) navigate('/prediksi')
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await loginUser({ email, password })
      emitAuthChanged()
      navigate('/prediksi')
    } catch (err) {
      setError(err?.message || 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-shell">
      <Navbar />

      <div className="page-shell-content">
        <div className="page-hero">
          <div className="wrap2">
            <div className="eyebrow">Get Started</div>
            <h1>Login</h1>
            <p>Masuk untuk menyimpan riwayat prediksi Anda di halaman Prediksi.</p>
          </div>
        </div>

        <div className="main">
          <div className="auth-wrap">
            <div className="auth-card">
              <h2>Masuk ke Akun</h2>
              <p className="auth-sub">
                Belum punya akun? <NavLink to="/register">Daftar</NavLink>
              </p>

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label>Email</label>
                  <div className="input-wrap">
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Password</label>
                  <div className="input-wrap">
                    <input
                      type="password"
                      placeholder="Minimal 8 karakter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <button className="auth-submit" type="submit" disabled={loading}>
                  {loading ? 'Memproses…' : 'Login'}
                </button>

                {error ? <div className="auth-error">{error}</div> : null}
              </form>
            </div>

            <div className="auth-side">
              <div className="auth-side-card">
                <div className="auth-side-title">Manfaat Login</div>
                <div className="auth-side-list">
                  <div className="auth-side-item">
                    <span className="auth-side-dot" />
                    Riwayat prediksi tersimpan otomatis saat Anda melakukan prediksi.
                  </div>
                  <div className="auth-side-item">
                    <span className="auth-side-dot" />
                    Akses cepat untuk membandingkan hasil prediksi dari waktu ke waktu.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterSimple />
    </div>
  )
}

export default Login

