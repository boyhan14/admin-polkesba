import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const initialNotifData = [
  { id: 1, type: 'Order baru', border: 'green', time: '2:57', text: 'Orderan masuk, Seseorang bernama xxxas, telah memesan Produk xxxx, Harga xxxx, Jumlah xxxx, Pengiriman xxx, Pembayaran xxxx, Total harga xxxx' },
  { id: 2, type: 'User Registrasi', border: 'blue', time: '10:21', text: '+Halo Admin, Maulidin ayubi baru saja berhasil mendaftar sebagai user baru.' },
  { id: 3, type: 'Pembayaran Masuk', border: 'green', time: '10:21', text: 'Pembayaran Berhasil, Seseorang bernama xxxx berhasil melakukan pembayaran melalui xxxx.' },
]
const initialActivityData = [
  { id: 1, type: 'Hapus Produk', border: 'green', time: '2:57', text: 'Akses admin, AdminAnda telah menghapus Produk xxxx Dengan Harga xxxx.' },
  { id: 2, type: 'Blokir User', border: 'orange', time: '10:21', text: 'Akses Admin, Maulidin ayubi baru saja Di Blokir karna Alasan xxxxxxxxxxxxxxxxxxxxxxxxxxxxx.' },
  { id: 3, type: 'Tambah Produk', border: 'green', time: '2:57', text: 'Akses admin.' },
]
const chartData = [
  { month: 'Jan', value: 80 },
  { month: 'Feb', value: 120 },
  { month: 'Mar', value: 100 },
  { month: 'Apr', value: 140 },
  { month: 'Mei', value: 160 },
  { month: 'Jun', value: 180 },
]

export default function Widgets() {
  const [notifList, setNotifList] = useState(() => {
    try {
      const raw = localStorage.getItem('widgets_notifs')
      if (raw) return JSON.parse(raw)
    } catch (e) {}
    return initialNotifData
  })
  const [activityList, setActivityList] = useState(initialActivityData)
  const [lastRemovedNotif, setLastRemovedNotif] = useState(null)
  const [undoTimerId, setUndoTimerId] = useState(null)

  const removeNotif = (id) => setNotifList(prev => {
    const removed = prev.find(n => n.id === id) || null
    const next = prev.filter(n => n.id !== id)
    setLastRemovedNotif(removed)
    try { localStorage.setItem('widgets_notifs', JSON.stringify(next)) } catch (e) {}
    // start undo timer (5s)
    if (undoTimerId) clearTimeout(undoTimerId)
    const t = setTimeout(() => setLastRemovedNotif(null), 5000)
    setUndoTimerId(t)
    return next
  })
  const removeActivity = (id) => setActivityList(prev => prev.filter(a => a.id !== id))

  const undoRemoveNotif = () => {
    if (!lastRemovedNotif) return
    setNotifList(prev => {
      const next = [lastRemovedNotif, ...prev]
      try { localStorage.setItem('widgets_notifs', JSON.stringify(next)) } catch (e) {}
      return next
    })
    setLastRemovedNotif(null)
    if (undoTimerId) { clearTimeout(undoTimerId); setUndoTimerId(null) }
  }

  return (
    <div className="widgets-page">
      <div className="page-title">
        <h1>Widgets Overview</h1>
      </div>
      <div className="widgets-grid">
        <div className="widgets-left">
          <div className="card">
            <div className="card-title"><i className="fa fa-bell" style={{ marginRight: 8 }} /> Notification</div>
            {notifList.map((n) => (
              <div key={n.id} className={`notif-item border-${n.border}`}>
                <div className="notif-content">
                  <strong>{n.type}</strong>
                  <p>{n.text}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="notif-time">{n.time}</span>
                  <button type="button" className="btn btn-gray btn-sm" onClick={() => removeNotif(n.id)}>Hapus</button>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title"><i className="fa fa-clock-o" style={{ marginRight: 8 }} /> Recent Activity</div>
            {activityList.map((a) => (
              <div key={a.id} className={`notif-item border-${a.border}`}>
                <div className="notif-content">
                  <strong>{a.type}</strong>
                  <p>{a.text}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="notif-time">{a.time}</span>
                  <button type="button" className="btn btn-gray btn-sm" onClick={() => removeActivity(a.id)}>Hapus</button>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title"><i className="fa fa-trophy" style={{ marginRight: 8 }} /> Top Produk Terlaris</div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="top-produk">
                <span className="rank">{i}</span>
                <div className="thumb" />
                <div>
                  <strong>Sabun Mandi</strong>
                  <p>Kategori xxx, Harga xxx</p>
                  <small>Terjual lebih dari 1.000 Product</small>
                </div>
                <span className="notif-time">2:57</span>
              </div>
            ))}
          </div>
        </div>
        <div className="widgets-right">
          <div className="summary-cards">
            <div className="summary-card green"><i className="fa fa-users" /><span>User yang sedang Aktif</span><strong>113 User</strong></div>
            <div className="summary-card gray"><i className="fa fa-truck" /><span>Pesanan Diproses</span><strong>41 Pesanan</strong></div>
            <div className="summary-card green"><i className="fa fa-money" /><span>Total Pendapatan</span><strong>Rp 42.332.000</strong></div>
            <div className="summary-card orange"><i className="fa fa-list" /><span>Orderan Hari Ini</span><strong>187 Orderan</strong></div>
          </div>
          <div className="card">
            <div className="card-title">Stok Hampir Habis</div>
            <ul className="stok-list">
              <li>• Deterjen baju</li>
              <li>• Sabun mandi</li>
              <li>• Sampo</li>
              <li>• Parfum</li>
            </ul>
          </div>
          <div className="card">
            <div className="card-title">
              PENJUALAN BULANAN
              <span style={{ marginLeft: 'auto', color: 'var(--green-active)', fontSize: 14 }}><i className="fa fa-arrow-up" /> +25%</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--gray-light)', marginBottom: 12 }}>dalam Rupiah (Rp)</p>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card card-calendar-widget">
            <div className="cal-widget-header">
              <span>Kalender</span>
              <div className="cal-widget-btns">
                <button type="button"><i className="fa fa-minus" /></button>
                <button type="button"><i className="fa fa-square-o" /></button>
                <button type="button"><i className="fa fa-times" /></button>
              </div>
            </div>
            <div className="cal-widget-body">
              <div className="cal-widget-date">2024 - Senin, Desember 15</div>
              <div className="cal-nav"><button type="button">&lt;</button><span>Desember 2024</span><button type="button">&gt;</button></div>
              <div className="cal-weekdays">
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(d => <span key={d}>{d}</span>)}
              </div>
              <div className="cal-grid">
                {[].concat(Array(1).fill(''), Array.from({ length: 31 }, (_, i) => i + 1), Array(3).fill('')).slice(0, 35).map((d, i) => (
                  <span key={i} className={d === 15 ? 'current' : ''}>{d !== '' ? d : ''}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
