import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'

export default function Layout({ onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  const isActive = (p) => path === p || (p !== '/' && path.startsWith(p))
  const isDataVizOpen = path.startsWith('/data-visualisasi')

  const navItems = [
    { path: '/', icon: 'fa-th-large', label: 'Dashboard' },
    { path: '/widgets', icon: 'fa-th', label: 'Widgets' },
    {
      path: '/data-visualisasi',
      icon: 'fa-bar-chart',
      label: 'Data Visualisasi',
      children: [
        { path: '/data-visualisasi/penjualan', label: 'Penjualan' },
        { path: '/data-visualisasi/orderan', label: 'Orderan' },
        { path: '/data-visualisasi/produk', label: 'Produk' },
        { path: '/data-visualisasi/user', label: 'User' },
      ],
    },
    { path: '/forms', icon: 'fa-file-text-o', label: 'Forms' },
    { path: '/tabel', icon: 'fa-table', label: 'Tabel' },
    { path: '/kalender', icon: 'fa-calendar', label: 'Kalender' },
    { path: '/kotak-surat', icon: 'fa-envelope', label: 'Kotak Surat' },
    { path: '/chat-langsung', icon: 'fa-comments', label: 'Chat langsung' },
  ]

  return (
    <div className="layout">
      <header className="header">
        <div className="header-green">
          <span className="header-brand">Admin Polkesba</span>
        </div>
        <div className="header-right">
          <span className="header-subtitle">Login Terakhir 13:25, 14 Oktober, 2025</span>
          <div className="header-actions">
            <Link to="/kotak-surat" className="header-icon" title="Kotak Surat"><i className="fa fa-envelope" /></Link>
            <Link to="/widgets" className="header-icon" title="Notifikasi"><i className="fa fa-bell" /></Link>
            <button type="button" className="header-icon" title="Profil"><i className="fa fa-user" /></button>
            <span className="header-user">Admin only</span>
            <Link to="/pengaturan" className="header-icon" title="Pengaturan"><i className="fa fa-cog" /></Link>
          </div>
        </div>
      </header>

      <div className="layout-body">
        <aside className="sidebar">
          <div className="sidebar-user">
            <div className="avatar"><i className="fa fa-user" /></div>
            <span className="sidebar-name">Sumanto</span>
            <span className="sidebar-status"><span className="status-dot" /> Online</span>
          </div>
          <div className="sidebar-search">
            <input type="text" placeholder="Search..." />
          </div>
          <nav className="sidebar-nav">
            <div className="nav-label">MAIN NAVIGATION</div>
            {navItems.map((item) => (
              <div key={item.path} className="nav-item-wrap">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className={`nav-item ${isDataVizOpen ? 'active' : ''}`}
                      onClick={() => navigate(item.path + '/penjualan')}
                    >
                      <i className={`fa ${item.icon}`} />
                      <span>{item.label}</span>
                      <i className={`fa fa-chevron-down ${isDataVizOpen ? 'open' : ''}`} />
                    </button>
                    {isDataVizOpen && (
                      <div className="nav-children">
                        {item.children.map((c) => (
                          <Link
                            key={c.path}
                            to={c.path}
                            className={`nav-child ${isActive(c.path) ? 'active' : ''}`}
                          >
                            <i className="fa fa-circle" />
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  >
                    <i className={`fa ${item.icon}`} />
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
