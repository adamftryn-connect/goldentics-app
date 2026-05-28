import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Beranda from './pages/Beranda'
import Grafik from './pages/Grafik'
import Kalkulator from './pages/Kalkulator'
import Prediksi from './pages/Prediksi'
import Tentang from './pages/Tentang'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/grafik" element={<Grafik />} />
        <Route path="/kalkulator" element={<Kalkulator />} />
        <Route path="/prediksi" element={<Prediksi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tentang" element={<Tentang />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
