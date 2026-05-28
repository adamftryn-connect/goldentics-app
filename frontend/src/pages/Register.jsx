import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FooterSimple from '../components/FooterSimple'
import { registerUser } from '../api/goldenticsApi.js'
import { emitAuthChanged } from '../utils/authEvents.js'
import './Auth.css'

function Register() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
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
      await registerUser({ fullName, email, password })
      emitAuthChanged()
      navigate('/prediksi')
    } catch (err) {
      setError(err?.message || 'Registrasi gagal')
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
            <h1>Register</h1>
            <p>Buat akun untuk menyimpan riwayat prediksi Anda.</p>
          </div>
        </div>

        <div className="main">
          <div className="auth-wrap">
            <div className="auth-card">
              <h2>Buat Akun</h2>
              <p className="auth-sub">
                Sudah punya akun? <NavLink to="/login">Login</NavLink>
              </p>

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label>Nama Lengkap</label>
                  <div className="input-wrap">
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <p className="field-hint">Opsional (boleh dikosongkan)</p>
                </div>

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
                  {loading ? 'Memproses…' : 'Register'}
                </button>

                {error ? <div className="auth-error">{error}</div> : null}
              </form>
            </div>

            <div className="auth-side">
              <div className="auth-side-card">
                <div className="auth-side-title">Catatan</div>
                <div className="auth-side-list">
                  <div className="auth-side-item">
                    <span className="auth-side-dot" />
                    Password minimal 8 karakter (sesuai validasi backend).
                  </div>
                  <div className="auth-side-item">
                    <span className="auth-side-dot" />
                    Setelah login, prediksi yang Anda buat akan tersimpan sebagai riwayat.
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

export default Register

