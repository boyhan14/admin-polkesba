import { useState, useEffect } from 'react'

const initialMessages = [
  { id: 1, from: 'Andi Susanto', preview: 'Selamat sore Admin, Saya ingin menanyakan status pe...', date: '24 April 2025, 12:35', full: 'Selamat sore Admin, Saya ingin menanyakan status pesanan saya. Mohon informasinya.' },
]

const STORAGE_KEY = 'kotak_messages'

export default function KotakSurat() {
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch (e) {}
    return initialMessages
  })
  const [selected, setSelected] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        return parsed[0] || null
      }
    } catch (e) {}
    return messages[0] || null
  })
  const [search, setSearch] = useState('')
  const [kepada, setKepada] = useState('')
  const [subjek, setSubjek] = useState('')
  const [isi, setIsi] = useState('')
  const [lastRemoved, setLastRemoved] = useState(null)
  const [undoTimerId, setUndoTimerId] = useState(null)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)) } catch (e) {}
  }, [messages])

  const deleteSelected = () => {
    if (!selected) return
    setMessages(prev => {
      const next = prev.filter(m => m.id !== selected.id)
      setLastRemoved(selected)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch (e) {}
      // start undo timer
      if (undoTimerId) clearTimeout(undoTimerId)
      const t = setTimeout(() => setLastRemoved(null), 5000)
      setUndoTimerId(t)
      return next
    })
    setSelected(null)
  }

  const undoDelete = () => {
    if (!lastRemoved) return
    setMessages(prev => {
      const next = [lastRemoved, ...prev]
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch (e) {}
      return next
    })
    setLastRemoved(null)
    if (undoTimerId) { clearTimeout(undoTimerId); setUndoTimerId(null) }
  }

  const handleKirim = () => {
    if (!isi.trim()) return
    const now = new Date()
    const newMsg = {
      id: Date.now(),
      from: kepada.trim() || 'Admin',
      preview: isi.length > 60 ? isi.slice(0, 57) + '...' : isi,
      date: now.toLocaleString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      full: isi,
    }
    const next = [newMsg, ...messages]
    setMessages(next)
    setSelected(newMsg)
    setKepada('')
    setSubjek('')
    setIsi('')
  }

  return (
    <div className="kotak-surat-page">
      <div className="page-title">
        <h1>Kotak Surat <span className="subtitle">Laporan Pembeli</span></h1>
      </div>

      <div className="toolbar">
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="toolbar-search" />
        <button type="button" className="btn btn-green"><i className="fa fa-plus" /> Tambah Pesan</button>
        <button type="button" className="btn btn-gray" onClick={deleteSelected}><i className="fa fa-trash" /> Hapus</button>
        <button type="button" className="btn btn-gray"><i className="fa fa-check" /> Tandai Terbaca</button>
      </div>

      <div className="inbox-layout">
        <div className="inbox-list">
          <div className="inbox-col-header">
            <input type="checkbox" />
            <span>Pesan</span>
          </div>
          {messages.filter(m => {
            const q = search.trim().toLowerCase()
            if (!q) return true
            return (m.from || '').toLowerCase().includes(q) || (m.preview || '').toLowerCase().includes(q)
          }).map((m) => (
            <div
              key={m.id}
              className={`inbox-item ${selected?.id === m.id ? 'selected' : ''}`}
              onClick={() => setSelected(m)}
            >
              <input type="checkbox" onClick={(e) => e.stopPropagation()} />
              <div className="inbox-item-content">
                <strong>{m.from}</strong>
                <p>{m.preview}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="inbox-dates">
          <div className="inbox-col-header">Hari/Tanggal</div>
          {messages.filter(m => {
            const q = search.trim().toLowerCase()
            if (!q) return true
            return (m.from || '').toLowerCase().includes(q) || (m.preview || '').toLowerCase().includes(q)
          }).map((m) => (
            <div key={m.id} className="inbox-date-item">{m.date}</div>
          ))}
        </div>
        <div className="inbox-detail">
          <div className="inbox-col-header">Isi Surat & Tambah Pesan</div>
          {selected && (
            <>
              <div className="inbox-detail-from"><strong>{selected.from}</strong></div>
              <div className="inbox-detail-body">{selected.full}</div>
              <div className="inbox-compose">
                <h4>Tambah Pesan</h4>
                <div className="form-group">
                  <label>Kepada:</label>
                  <input type="text" value={kepada} onChange={(e) => setKepada(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Subjek:</label>
                  <input type="text" value={subjek} onChange={(e) => setSubjek(e.target.value)} />
                </div>
                <div className="form-group">
                  <textarea rows={4} value={isi} onChange={(e) => setIsi(e.target.value)} placeholder="Isi pesan..." />
                </div>
                <div className="compose-actions">
                    <button type="button" className="btn btn-blue" onClick={handleKirim}><i className="fa fa-paper-plane" /> Kirim</button>
                    <button type="button" className="btn btn-gray"><i className="fa fa-paperclip" /></button>
                    <button type="button" className="btn btn-gray" onClick={deleteSelected}>Hapus Pesan</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
        {lastRemoved && (
          <div style={{ position: 'fixed', bottom: 20, left: 20, background: 'white', padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', borderRadius: 6 }}>
            <span>Pesan dihapus</span>
            <button type="button" className="btn btn-blue" style={{ marginLeft: 12 }} onClick={undoDelete}>Undo</button>
          </div>
        )}
    </div>
  )
}
