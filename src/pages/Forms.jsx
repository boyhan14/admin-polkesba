import { useState, useEffect } from 'react'

const initialUsers = ['Khan', 'Khan', 'Khan'].map((n, i) => ({ id: i, name: n, username: `user${i}`, email: '' }))
const initialProducts = ['Sabun Skafasa', 'Sabun Skafasa'].map((n, i) => ({ id: i, name: n, price: '', stock: '' }))
const categories = [
  { name: 'Terbaru', thumb: '' },
  { name: 'Terlaris', thumb: '' },
  { name: 'Skafasa', thumb: '' },
  { name: 'Alat lab', thumb: '' },
]

export default function Forms() {
  const [users, setUsers] = useState(() => {
    try {
      const raw = localStorage.getItem('forms_users')
      if (raw) return JSON.parse(raw)
    } catch (e) {}
    return initialUsers
  })
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem('forms_products')
      if (raw) return JSON.parse(raw)
    } catch (e) {}
    return initialProducts
  })
  const [selectedUser, setSelectedUser] = useState(null)
  const [userForm, setUserForm] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productForm, setProductForm] = useState(null)
  const [activeTab, setActiveTab] = useState('edit')

  useEffect(() => {
    try { localStorage.setItem('forms_users', JSON.stringify(users)) } catch (e) {}
  }, [users])
  useEffect(() => {
    try { localStorage.setItem('forms_products', JSON.stringify(products)) } catch (e) {}
  }, [products])

  return (
    <div className="forms-page">
      <div className="page-title">
        <h1>Forms <span className="subtitle">Admin Only</span></h1>
        <div className="title-underline" />
      </div>

      <div className="forms-grid">
        <div className="card form-module">
          <div className="card-title">Kontrol User <span className="badge">Total User : 337</span></div>
          <div className="form-module-body">
            <div className="form-list">
              {users.map((u) => (
                <div key={u.id} className="form-list-item">
                  <i className="fa fa-user" />
                  <span>{u.name}</span>
                  <button type="button" className="btn btn-blue btn-sm" onClick={() => { setSelectedUser(u); setUserForm({ ...u }) }}>Detail</button>
                </div>
              ))}
            </div>
            <div className="form-detail">
              <div className="form-detail-header">Detail User</div>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={userForm ? userForm.name : ''} onChange={(e) => setUserForm((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input type="text" value={userForm ? userForm.username : ''} onChange={(e) => setUserForm((f) => ({ ...f, username: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={userForm ? userForm.email : ''} onChange={(e) => setUserForm((f) => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>No. HP</label>
                <input type="text" />
              </div>
              <div className="form-section">Status Akun</div>
              <div className="form-group">
                <label>Status</label>
                <select><option>Aktif</option><option>Tidak Aktif</option><option>Suspended</option></select>
              </div>
              <div className="form-group">
                <label>Alasan Blokir</label>
                <input type="text" />
              </div>
              <div className="form-section">Keamanan</div>
              <div className="form-group row">
                <button type="button" className="btn btn-gray">Reset Password</button>
                <button type="button" className="btn btn-gray">Force Logout</button>
              </div>
              <div className="form-section">Alamat</div>
              <div className="form-group">
                <label>Alamat</label>
                <input type="text" />
              </div>
              <button type="button" className="btn btn-blue" onClick={() => {
                if (!userForm) return
                setUsers((prev) => prev.map(u => u.id === userForm.id ? { ...u, ...userForm } : u))
                setSelectedUser(userForm)
              }}>Simpan</button>
            </div>
          </div>
        </div>

        <div className="card form-module">
          <div className="card-title">Kontrol Produk <span className="badge">Total Produk : 112</span></div>
          <div className="form-module-body">
            <div className="form-list">
              {products.map((p) => (
                <div key={p.id} className="form-list-item">
                  <i className="fa fa-leaf" style={{ color: 'var(--green-primary)' }} />
                  <span>{p.name}</span>
                  <button type="button" className="btn btn-blue btn-sm" onClick={() => { setSelectedProduct(p); setProductForm({ ...p }) }}>Detail</button>
                </div>
              ))}
            </div>
            <div className="form-detail">
              <div className="form-tabs">
                <button type="button" className={activeTab === 'edit' ? 'active' : ''} onClick={() => setActiveTab('edit')}>Edit Produk</button>
                <button type="button" className={activeTab === 'tambah' ? 'active' : ''} onClick={() => setActiveTab('tambah')}>Tambah Produk</button>
              </div>
              <div className="form-detail-header">Informasi Produk</div>
              <div className="form-group">
                <label>Nama Produk</label>
                <input type="text" value={productForm ? productForm.name : ''} onChange={(e) => setProductForm((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Kategori</label>
                <select><option>Lemon</option></select>
              </div>
              <div className="form-group">
                <label>Harga</label>
                <input type="text" value={productForm ? productForm.price : ''} onChange={(e) => setProductForm((f) => ({ ...f, price: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Stok</label>
                <input type="text" value={productForm ? productForm.stock : ''} onChange={(e) => setProductForm((f) => ({ ...f, stock: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select><option>Aktif</option></select>
              </div>
              <div className="form-group">
                <label>Deskripsi</label>
                <textarea rows={3} />
              </div>
              <div className="form-group">
                <label>Upload Foto</label>
                <div className="upload-box"><i className="fa fa-upload" /> Upload File</div>
              </div>
              <div className="form-group">
                <label>Diskon (%)</label>
                <input type="text" />
              </div>
              <button type="button" className="btn btn-blue" onClick={() => {
                if (!productForm) return
                setProducts((prev) => prev.map(p => p.id === productForm.id ? { ...p, ...productForm } : p))
                setSelectedProduct(productForm)
              }}>Simpan</button>
            </div>
          </div>
        </div>

        <div className="card form-module">
          <div className="card-title">Kontrol Kategori <span className="badge">Total Kategori: 4</span></div>
          <div className="form-module-body">
            <div className="form-list">
              {categories.map((c, i) => (
                <div key={i} className="form-list-item cat-item">
                  <div className="cat-thumb" />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
            <div className="form-detail">
              <div className="form-detail-header">Tambah Kategori</div>
              <div className="form-group">
                <label>Nama Kategori</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Slug</label>
                <input type="text" placeholder="(otomatis)" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select><option>Aktif</option></select>
              </div>
              <div className="form-group">
                <label>Kategori Induk</label>
                <input type="text" defaultValue="1" />
              </div>
              <button type="button" className="btn btn-blue">Simpan</button>
            </div>
          </div>
        </div>

        <div className="card form-module">
          <div className="card-title">Kontrol Produk <span className="badge">Total Produk : 112</span></div>
          <div className="form-module-body">
            <div className="form-list">
              {products.map((p) => (
                <div key={p.id} className="form-list-item">
                  <i className="fa fa-leaf" style={{ color: 'var(--green-primary)' }} />
                  <span>{p.name}</span>
                  <button type="button" className="btn btn-blue btn-sm">Detail</button>
                </div>
              ))}
            </div>
            <div className="form-detail">
              <div className="form-detail-header">Detail Pesanan</div>
              <div className="form-group">
                <label>Detail Pesanan</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Status Pesanan</label>
                <select><option>Dikirim</option></select>
              </div>
              <div className="form-group">
                <label>No Resi</label>
                <input type="text" />
              </div>
              <button type="button" className="btn btn-blue">Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
