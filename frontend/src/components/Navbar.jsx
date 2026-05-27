import { NavLink, useNavigate } from 'react-router-dom'
import logoHeader from '../../images/logo-header.svg'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="nb-logo" onClick={() => navigate('/')}>
        <img className="nb-logo-img" src={logoHeader} alt="Goldentics" />
      </div>
      <div className="nb-links">
        <NavLink to="/" end className={({ isActive }) => 'nb-link' + (isActive ? ' active' : '')}>Beranda</NavLink>
        <NavLink to="/grafik" className={({ isActive }) => 'nb-link' + (isActive ? ' active' : '')}>Grafik</NavLink>
        <NavLink to="/kalkulator" className={({ isActive }) => 'nb-link' + (isActive ? ' active' : '')}>Kalkulator</NavLink>
        <NavLink to="/prediksi" className={({ isActive }) => 'nb-link' + (isActive ? ' active' : '')}>Prediksi</NavLink>
        <NavLink to="/tentang" className={({ isActive }) => 'nb-link' + (isActive ? ' active' : '')}>Tentang</NavLink>
      </div>
      <button className="nb-btn">Login</button>
    </nav>
  )
}

export default Navbar
