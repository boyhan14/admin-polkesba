import { useState } from 'react'

const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const jan2025 = () => {
  const days = []
  let d = 0
  const start = 3 // Jan 1 2025 = Wed
  for (let i = 0; i < 35; i++) {
    if (i < start) days.push('')
    else if (d < 31) { d++; days.push(d) }
    else days.push('')
  }
  return days
}

const todoItems = [
  'Rekap laporan penjualan bulan ini..',
  'Rekap laporan rating bulan ini..',
  'Rekap laporan registrasi user bulan ini..',
  'Rekap laporan barang bulan ini...',
]

export default function Kalender() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem('kalender_todos')
      if (raw) return JSON.parse(raw)
    } catch (e) {
      // ignore parse errors
    }
    return todoItems.map(t => ({ text: t, done: false }))
  })
  const [judul, setJudul] = useState('')
  const [deskripsi, setDeskripsi] = useState('')

  const saveTodosToStorage = (next) => {
    try {
      localStorage.setItem('kalender_todos', JSON.stringify(next))
    } catch (e) {
      // ignore storage errors
    }
  }

  const toggleTodo = (i) => {
    setTodos(prev => {
      const next = prev.map((t, j) => j === i ? { ...t, done: !t.done } : t)
      saveTodosToStorage(next)
      return next
    })
  }

  const handleSave = () => {
    if (!judul.trim()) return
    const text = deskripsi.trim() ? `${judul.trim()} — ${deskripsi.trim()}` : judul.trim()
    const next = [...todos, { text, done: false }]
    setTodos(next)
    saveTodosToStorage(next)
    setJudul('')
    setDeskripsi('')
  }

  return (
    <div className="kalender-page">
      <div className="page-title">
        <h1>Kalender Dan To Do List</h1>
      </div>

      <div className="kalender-widget">
        <div className="cal-main">
          <div className="cal-title">JANUARY 2025</div>
          <div className="cal-weekdays-full">
            {weekDays.map(d => <span key={d}>{d}</span>)}
          </div>
          <div className="cal-grid-full">
            {jan2025().map((d, i) => (
              <span
                key={i}
                className={`cal-day ${d === 14 ? 'highlight blue' : ''} ${[5, 12, 19].includes(d) ? 'sunday' : ''} ${d === 12 ? 'deadline' : ''}`}
              >
                {d || ''}
                {d === 12 && <span className="deadline-label">PROJECT DEADLINE</span>}
              </span>
            ))}
          </div>
          <div className="cal-footer">
            <i className="fa fa-leaf" style={{ color: 'var(--green-primary)', marginRight: 8 }} />
            PLAN YOUR YEAR
          </div>
        </div>
      </div>

      <div className="todo-widgets">
        <div className="card">
          <div className="card-title">To Do List</div>
          <ul className="todo-list">
            {todos.map((t, i) => (
              <li key={i}>
                <input type="checkbox" checked={t.done} onChange={() => toggleTodo(i)} />
                <span className={t.done ? 'done' : ''}>{t.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <div className="card-title">Tambah To Do List</div>
          <div className="form-group">
            <label>Judul</label>
            <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Judul" />
          </div>
          <div className="form-group">
            <textarea
              rows={4}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Rekap laporan penjualan bulan ini..."
            />
          </div>
          <button type="button" className="btn btn-blue" onClick={handleSave}>Simpan</button>
        </div>
      </div>
    </div>
  )
}
