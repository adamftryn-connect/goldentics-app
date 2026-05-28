import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logoHeader from '../../images/logo-header.svg'
import userPicLogin from '../../images/icon/user-pic-login.svg'
import { getMe, logoutUser } from '../api/goldenticsApi.js'
import { emitAuthChanged, onAuthChanged } from '../utils/authEvents.js'

function Navbar() {
  const navigate = useNavigate()
  const [hasToken, setHasToken] = useState(
    Boolean(localStorage.getItem('goldentics_token'))
  )
  const [loading, setLoading] = useState(false)
  const [me, setMe] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadMe() {
      const token = localStorage.getItem('goldentics_token')
      setHasToken(Boolean(token))
      if (!token) {
        setMe(null)
        return
      }

      setLoading(true)
      try {
        const data = await getMe()
        if (!cancelled) setMe(data)
      } catch {
        if (!cancelled) {
          setMe(null)
          setHasToken(false)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadMe()
    const off = onAuthChanged(() => loadMe())
    return () => {
      cancelled = true
      off()
    }
  }, [])

  function handleLogout() {
    logoutUser()
    emitAuthChanged()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="nb-logo" onClick={() => navigate('/')}>
        <img className="nb-logo-img" src={logoHeader} alt="Goldentics" />
      </div>
      <div className="nb-links">
        <NavLink to="/" end className={({ isActive }) => 'nb-link' + (isActive ? ' active' : '')}>
          Beranda
        </NavLink>
        <NavLink to="/grafik" className={({ isActive }) => 'nb-link' + (isActive ? ' active' : '')}>
          Grafik
        </NavLink>
        <NavLink to="/kalkulator" className={({ isActive }) => 'nb-link' + (isActive ? ' active' : '')}>
          Kalkulator
        </NavLink>
        <NavLink to="/prediksi" className={({ isActive }) => 'nb-link' + (isActive ? ' active' : '')}>
          Prediksi
        </NavLink>
        <NavLink to="/tentang" className={({ isActive }) => 'nb-link' + (isActive ? ' active' : '')}>
          Tentang
        </NavLink>
      </div>
      <div className="nb-actions">
        {hasToken ? (
          <>
            <div className="nb-user">
              <img className="nb-user-pic" src={userPicLogin} alt="" aria-hidden="true" />
              <div className="nb-user-name">
                {loading ? 'Memuat…' : me?.fullName || me?.email || 'User'}
              </div>
            </div>
            <button className="nb-btn" onClick={handleLogout}>
              {loading ? '...' : 'Logout'}
            </button>
          </>
        ) : (
          <>
            <button className="nb-btn-secondary" onClick={() => navigate('/register')}>
              Register
            </button>
            <button className="nb-btn" onClick={() => navigate('/login')}>
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
