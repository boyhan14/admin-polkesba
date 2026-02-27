import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Widgets from './pages/Widgets'
import DataPenjualan from './pages/DataPenjualan'
import DataOrderan from './pages/DataOrderan'
import DataProduk from './pages/DataProduk'
import DataUser from './pages/DataUser'
import Forms from './pages/Forms'
import Tabel from './pages/Tabel'
import Kalender from './pages/Kalender'
import KotakSurat from './pages/KotakSurat'
import ChatLangsung from './pages/ChatLangsung'
import Settings from './pages/Settings'

function App() {
  console.log('App: render start')
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('admin_polkesba_logged') === 'true'
  })

  useEffect(() => {
    console.log('App: useEffect mount, isLoggedIn=', isLoggedIn)
    const handleLogoutEvent = () => setIsLoggedIn(false)
    window.addEventListener('logout', handleLogoutEvent)
    return () => window.removeEventListener('logout', handleLogoutEvent)
  }, [])

  const handleLogin = () => {
    localStorage.setItem('admin_polkesba_logged', 'true')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_polkesba_logged')
    setIsLoggedIn(false)
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/" element={
          isLoggedIn ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" replace />
        }>
          <Route index element={<Dashboard />} />
          <Route path="widgets" element={<Widgets />} />
          <Route path="data-visualisasi/penjualan" element={<DataPenjualan />} />
          <Route path="data-visualisasi/orderan" element={<DataOrderan />} />
          <Route path="data-visualisasi/produk" element={<DataProduk />} />
          <Route path="data-visualisasi/user" element={<DataUser />} />
          <Route path="forms" element={<Forms />} />
          <Route path="tabel" element={<Tabel />} />
          <Route path="kalender" element={<Kalender />} />
          <Route path="kotak-surat" element={<KotakSurat />} />
          <Route path="chat-langsung" element={<ChatLangsung />} />
          <Route path="pengaturan" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
      </Routes>
    </div>
  )
}

export default App
