import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const STORAGE_PHOTO = 'admin_polkesba_profile_photo'
const STORAGE_PROFILE = 'admin_polkesba_profile_info'
const MAX_SIZE = 2 * 1024 * 1024 // 2 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

export default function Settings() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState(() => localStorage.getItem(STORAGE_PHOTO) || null)
  const [saveMessage, setSaveMessage] = useState(null)
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROFILE)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          nama: parsed.nama ?? 'Sumanto',
          role: parsed.role ?? 'Admin',
          email: parsed.email ?? '',
          password: '',
          confirmPassword: '',
        }
      }
    } catch (_) {}
    return { nama: 'Sumanto', role: 'Admin', email: '', password: '', confirmPassword: '' }
  })

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Format harus JPG atau PNG.')
      return
    }
    if (file.size > MAX_SIZE) {
      alert('Ukuran file maksimal 2 MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      setProfilePhoto(dataUrl)
      try {
        localStorage.setItem(STORAGE_PHOTO, dataUrl)
        // notify other parts of the app that profile photo changed
        window.dispatchEvent(new Event('profile_photo_updated'))
      } catch (err) {
        console.warn('Foto terlalu besar untuk disimpan di browser.', err)
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleHapusFoto = () => {
    setProfilePhoto(null)
    localStorage.removeItem(STORAGE_PHOTO)
    window.dispatchEvent(new Event('profile_photo_updated'))
  }

  const handleSimpan = () => {
    if (form.password && form.password !== form.confirmPassword) {
      setSaveMessage({ type: 'error', text: 'Konfirmasi password tidak cocok.' })
      return
    }
    const toSave = {
      nama: form.nama,
      role: form.role,
      email: form.email,
    }
    if (form.password) {
      toSave.password = form.password
    }
    try {
      localStorage.setItem(STORAGE_PROFILE, JSON.stringify(toSave))
      // notify other parts of the app that profile info (name/role/email) changed
      window.dispatchEvent(new Event('profile_info_updated'))
      setForm((prev) => ({ ...prev, password: '', confirmPassword: '' }))
      setSaveMessage({ type: 'success', text: 'Data berhasil disimpan.' })
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (err) {
      setSaveMessage({ type: 'error', text: 'Gagal menyimpan.' })
    }
  }

  const handleBatal = () => {
    try {
      const saved = localStorage.getItem(STORAGE_PROFILE)
      if (saved) {
        const parsed = JSON.parse(saved)
        setForm({
          nama: parsed.nama ?? 'Sumanto',
          role: parsed.role ?? 'Admin',
          email: parsed.email ?? '',
          password: '',
          confirmPassword: '',
        })
      } else {
        setForm({ nama: 'Sumanto', role: 'Admin', email: '', password: '', confirmPassword: '' })
      }
    } catch (_) {
      setForm({ nama: 'Sumanto', role: 'Admin', email: '', password: '', confirmPassword: '' })
    }
    setSaveMessage(null)
  }

  return (
    <div className="settings-page">
      <div className="page-title">
        <h1>Pengaturan <span className="subtitle">Admin Only</span></h1>
      </div>

      {saveMessage && (
        <div className={`save-message ${saveMessage.type}`}>
          {saveMessage.text}
        </div>
      )}

      <div className="settings-grid">
        <div className="card">
          <div className="card-title">Foto Profil</div>
          <div className="profile-photo-wrap">
            <div className="profile-photo">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profil" />
              ) : (
                <i className="fa fa-user" style={{ fontSize: 64, color: 'var(--gray-light)' }} />
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <div className="profile-actions">
              <button type="button" className="btn btn-green" onClick={handleUploadClick}>
                Unggah Foto
              </button>
              <button type="button" className="btn btn-gray" onClick={handleHapusFoto}>
                Hapus Foto
              </button>
            </div>
            <p className="profile-hint">Max 2 MB / JPG, PNG Format</p>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Informasi Akun</div>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input
              type="text"
              value={form.nama}
              onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Ubah Password Baru</label>
            <div className="input-with-icon">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password baru"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              />
              <button type="button" className="input-icon" onClick={() => setShowPass(!showPass)}>
                <i className={`fa fa-${showPass ? 'eye-slash' : 'eye'}`} />
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Konfirmasi Password</label>
            <div className="input-with-icon">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Konfirmasi password"
                value={form.confirmPassword}
                onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
              />
              <button type="button" className="input-icon" onClick={() => setShowConfirm(!showConfirm)}>
                <i className={`fa fa-${showConfirm ? 'eye-slash' : 'eye'}`} />
              </button>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-green" onClick={handleSimpan}>
              Simpan
            </button>
            <button type="button" className="btn btn-gray" onClick={handleBatal}>
              Batal
            </button>
            <button
              type="button"
              className="btn btn-gray"
              onClick={() => {
                localStorage.removeItem('admin_polkesba_logged')
                window.dispatchEvent(new Event('logout'))
                navigate('/login')
              }}
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
