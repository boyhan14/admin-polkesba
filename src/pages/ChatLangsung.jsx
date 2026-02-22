import { useState, useEffect } from 'react'

const contacts = [
  { id: 1, name: 'Nando Bagindang', last: 'Halo Admin...', time: '@10:21', avatar: 'N' },
  { id: 2, name: 'Dong yun', last: 'Halo Admin...', time: '@09:37', avatar: 'D' },
]
const initialMessages = [
  { id: 1, text: 'Halo, ada yang bisa dibantu?', time: '@10:21', me: true },
]

const STORAGE_KEY = 'chat_messages'

export default function ChatLangsung() {
  const [activeContact, setActiveContact] = useState(contacts[0])
  const [messagesMap, setMessagesMap] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch (e) {}
    // initialize with default for first contact
    return { [contacts[0].id]: initialMessages }
  })
  const [input, setInput] = useState('')

  useEffect(() => {
    // ensure activeContact exists in map
    setMessagesMap(prev => {
      if (prev[activeContact.id]) return prev
      const next = { ...prev, [activeContact.id]: [] }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch (e) {}
      return next
    })
  }, [activeContact])

  const getMessages = () => messagesMap[activeContact?.id] || []

  const send = () => {
    if (!input.trim() || !activeContact) return
    const msg = { id: Date.now(), text: input, time: '@' + new Date().toTimeString().slice(0, 5), me: true }
    setMessagesMap(prev => {
      const conv = prev[activeContact.id] ? [...prev[activeContact.id], msg] : [msg]
      const next = { ...prev, [activeContact.id]: conv }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch (e) {}
      return next
    })
    setInput('')
  }

  const clearConversation = () => {
    if (!activeContact) return
    setMessagesMap(prev => {
      const next = { ...prev, [activeContact.id]: [] }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch (e) {}
      return next
    })
  }

  return (
    <div className="chat-langsung-page">
      <div className="page-title">
        <h1>Chat Langsung Dengan Pembeli</h1>
      </div>

      <div className="chat-panel">
        <div className="chat-list">
          <div className="chat-list-header">
            <i className="fa fa-comments" />
            <span>Chat</span>
          </div>
          {contacts.map((c) => (
            <div
              key={c.id}
              className={`chat-contact ${activeContact?.id === c.id ? 'active' : ''}`}
              onClick={() => setActiveContact(c)}
            >
              <div className="chat-contact-avatar">{c.avatar}</div>
              <div className="chat-contact-info">
                <strong>{c.name}</strong>
                <p>{c.last}</p>
              </div>
              <span className="chat-contact-time">{c.time}</span>
            </div>
          ))}
        </div>
        <div className="chat-window">
          <div className="chat-window-header">
            <div className="chat-window-user">
              <div className="chat-contact-avatar">{activeContact?.avatar}</div>
              <strong>{activeContact?.name}</strong>
            </div>
          </div>
          <div className="chat-messages">
            {getMessages().map((m) => (
              <div key={m.id} className={`chat-bubble ${m.me ? 'me' : ''}`}>
                <div className="bubble-text">{m.text}</div>
                <span className="bubble-time">{m.time}</span>
              </div>
            ))}
          </div>
          <div className="chat-input-wrap">
            <input
              type="text"
              placeholder="Ketik Pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button type="button" className="btn btn-green btn-send" onClick={send}>
              <i className="fa fa-paper-plane" />
            </button>
            <button type="button" className="btn btn-gray" style={{ marginLeft: 8 }} onClick={clearConversation}>Hapus Percakapan</button>
          </div>
        </div>
      </div>
    </div>
  )
}
