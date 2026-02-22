import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const MINGGU = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4']
const orderanMinggu = [8000000, 10000000, 12000000, 14000000]
const incomeData = [
  { name: '2023', value: 67, color: '#5bc0de' },
  { name: '2024', value: 27, color: '#f0ad4e' },
  { name: '2025', value: 11, color: '#9b59b6' },
  { name: '2026', value: 21, color: '#e74c3c' },
]

const todoItems = [
  'Rekap laporan penjualan bulan ini.',
  'Rekap laporan rating bulan ini.',
  'Rekap laporan registrasi user bulan ini.',
  'Rekap laporan barang bulan ini.',
]

const smallCards = [
  { icon: 'fa-star', color: '#f1c40f', text: '400+ Rating yang didapatkan' },
  { icon: 'fa-times-circle', color: '#e74c3c', text: '12 Total Orderan Dibatalkan' },
  { icon: 'fa-building', color: '#8e44ad', text: '15 Promo yang sedang aktif' },
  { icon: 'fa-truck', color: '#f39c12', text: '500+ Total Orderan Sedang Diantar' },
  { icon: 'fa-eye', color: '#27ae60', text: '150juta+ Total Pendapatan Bulan ini' },
  { icon: 'fa-user', color: '#3498db', text: '1128 Total User' },
  { icon: 'fa-building-o', color: '#2c3e50', text: '900+ Total Orderan' },
  { icon: 'fa-shopping-cart', color: '#2c3e50', text: '134 Total Produk' },
]

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
const dec2024 = () => {
  const days = []
  const start = 1
  const end = 31
  let d = 0
  for (let i = 0; i < 35; i++) {
    if (i < 1) days.push('')
    else if (d < end) { d++; days.push(d) }
    else days.push('')
  }
  return days
}

export default function Dashboard() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem('dashboard_todos')
      if (raw) return JSON.parse(raw)
    } catch (e) {}
    return todoItems.map(t => ({ text: t, done: false }))
  })
  const [newTodo, setNewTodo] = useState('')
  const [chatInput, setChatInput] = useState('')
  const barData = MINGGU.map((m, i) => ({ name: m, value: orderanMinggu[i] }))

  const saveTodosToStorage = (next) => {
    try { localStorage.setItem('dashboard_todos', JSON.stringify(next)) } catch (e) {}
  }

  const toggleTodo = (i) => {
    setTodos(prev => {
      const next = prev.map((t, j) => j === i ? { ...t, done: !t.done } : t)
      saveTodosToStorage(next)
      return next
    })
  }

  const deleteTodo = (i) => {
    setTodos(prev => {
      const next = prev.filter((_, j) => j !== i)
      saveTodosToStorage(next)
      return next
    })
  }

  const addTodo = () => {
    const text = newTodo.trim()
    if (!text) return
    const next = [...todos, { text, done: false }]
    setTodos(next)
    saveTodosToStorage(next)
    setNewTodo('')
  }

  return (
    <div className="dashboard-page">
      <div className="page-title">
        <h1>Dashboard - admin</h1>
        <p className="subtitle">Dashboard Control Panel</p>
      </div>

      <div className="dashboard-cards row-3">
        <div className="metric-card green">
          <div className="metric-value">150</div>
          <div className="metric-label">Orderan Terbaru</div>
          <i className="fa fa-shopping-bag metric-icon" />
          <Link to="/data-visualisasi/orderan" className="btn btn-green btn-sm">Lihat sepenuhnya</Link>
        </div>
        <div className="metric-card green">
          <div className="metric-value">67%↑</div>
          <div className="metric-label">Data Melonjak</div>
          <i className="fa fa-bar-chart metric-icon" />
          <Link to="/data-visualisasi/penjualan" className="btn btn-green btn-sm">Lihat sepenuhnya</Link>
        </div>
        <div className="metric-card orange">
          <div className="metric-value">77</div>
          <div className="metric-label">Registrasi User</div>
          <i className="fa fa-users metric-icon" />
          <Link to="/data-visualisasi/user" className="btn btn-green btn-sm">Lihat sepenuhnya</Link>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card card-chat">
          <div className="card-title">
            <i className="fa fa-comments" style={{ marginRight: 8 }} />
            Live Chat
            <span className="dot green" /><span className="dot red" />
          </div>
          <div className="chat-entries">
            <div className="chat-entry">
              <div className="chat-avatar">D</div>
              <div className="chat-info">
                <strong>Dong yun</strong>
                <p>Halo Admin, pembatalan pesanan</p>
                <small>Attachments: Foto-barang-sabun.jpg</small>
                <button type="button" className="btn btn-blue btn-sm">Open</button>
              </div>
              <span className="chat-time">09:37</span>
            </div>
            <div className="chat-entry">
              <div className="chat-avatar">M</div>
              <div className="chat-info">
                <strong>Maulid</strong>
                <p>Halo Admin, pembatalan pesanan</p>
                <small>Attachments: Foto-barang-sabun.jpg</small>
                <button type="button" className="btn btn-blue btn-sm">Open</button>
              </div>
              <span className="chat-time">10:21</span>
            </div>
          </div>
          <div className="chat-input-wrap">
            <input
              type="text"
              placeholder="Ketik Disini untuk Broadcast..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="button" className="btn btn-green"><i className="fa fa-plus" /></button>
          </div>
        </div>

        <div className="card card-income">
          <div className="card-title">
            My income
            <Link to="/data-visualisasi/penjualan" className="link-small">Lihat Sepenuhnya..</Link>
          </div>
          <div className="pie-wrap">
            <PieChart width={280} height={220}>
              <Pie
                data={incomeData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${value}%`}
              >
                {incomeData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>

      <div className="dashboard-grid-2">
        <div className="card">
          <div className="card-title">Yang Harus Dikerjakan</div>
          <ul className="todo-list">
            {todos.map((t, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTodo(i)}
                />
                <span className={t.done ? 'done' : ''}>{t.text}</span>
                <button type="button" className="btn btn-gray btn-sm" style={{ marginLeft: 8 }} onClick={() => deleteTodo(i)}>Hapus</button>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Tambah todo..." />
            <button type="button" className="btn btn-blue" onClick={addTodo}>Tambah</button>
          </div>
        </div>

        <div className="card card-calendar">
          <div className="card-title">Kalender 2024 Senin, Desember 15</div>
          <div className="cal-header">
            <button type="button"><i className="fa fa-chevron-left" /></button>
            <span>Desember 2024</span>
            <button type="button"><i className="fa fa-chevron-right" /></button>
          </div>
          <div className="cal-weekdays">
            {weekDays.map(d => <span key={d}>{d}</span>)}
          </div>
          <div className="cal-grid">
            {dec2024().map((d, i) => (
              <span key={i} className={d === 15 ? 'current' : ''}>{d || ''}</span>
            ))}
          </div>
        </div>

        <div className="small-cards-grid">
          {smallCards.map((c, i) => (
            <div key={i} className="small-card">
              <i className={`fa ${c.icon}`} style={{ color: c.color, fontSize: 24, marginBottom: 8 }} />
              <div className="small-card-text">{c.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
