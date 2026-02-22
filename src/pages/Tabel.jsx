import { useState } from 'react'

const tableData = [
  { no: 1, bulan: 'Januari 2025', pesanan: '-', terjual: '-', pendapatan: '-' },
  { no: 2, bulan: 'Februari 2025', pesanan: '-', terjual: '-', pendapatan: '-' },
  { no: 3, bulan: 'Maret 2025', pesanan: '-', terjual: '-', pendapatan: '-' },
  { no: 4, bulan: 'April 2025', pesanan: '-', terjual: '-', pendapatan: '-' },
  { no: 5, bulan: 'Mei 2025', pesanan: '-', terjual: '-', pendapatan: '-' },
]

export default function Tabel() {
  const [bulan, setBulan] = useState('Januari')
  const [tahun, setTahun] = useState('2025')
  const [status, setStatus] = useState('Semua')

  const handleRefresh = () => {
    setBulan('Januari')
    setTahun('2025')
    setStatus('Semua')
  }

  const exportCSV = () => {
    const headers = ['No', 'Bulan/Tahun', 'Total Pesanan', 'Produk Terjual', 'Total Pendapatan']
    const rows = tableData.map(r => [r.no, r.bulan, r.pesanan, r.terjual, r.pendapatan])
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tabel_export_${tahun}_${bulan}.csv`
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportPDF = () => {
    // create printable HTML of the table and trigger browser print with basic styling
    const tableHtml = document.querySelector('.data-table')?.outerHTML || '<p>No table to print</p>'
    const title = `<h1 style="font-family: Arial, Helvetica, sans-serif;">Tabel Export - ${bulan} ${tahun}</h1>`
    const style = `
      <style>
        body { font-family: Arial, Helvetica, sans-serif; padding: 24px; color: #222 }
        table { border-collapse: collapse; width: 100%; }
        table th, table td { border: 1px solid #ddd; padding: 8px; }
        table th { background: #f5f5f5; text-align: left; }
        h1 { font-size: 18px; margin-bottom: 12px }
      </style>
    `
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Export PDF</title>${style}</head><body>${title}${tableHtml}</body></html>`)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); /* keep window open so user can cancel if desired */ }, 300)
  }

  return (
    <div className="tabel-page">
      <div className="page-title">
        <h1>Tabel <span className="subtitle">Admin Only</span></h1>
      </div>

      <div className="card">
        <div className="filter-bar">
          <div className="filter-group">
            <label>Bulan</label>
            <select value={bulan} onChange={(e) => setBulan(e.target.value)}>
              <option>Januari</option>
              <option>Februari</option>
              <option>Maret</option>
              <option>April</option>
              <option>Mei</option>
              <option>Juni</option>
              <option>Juli</option>
              <option>Agustus</option>
              <option>September</option>
              <option>Oktober</option>
              <option>November</option>
              <option>Desember</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Tahun</label>
            <select value={tahun} onChange={(e) => setTahun(e.target.value)}>
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Semua</option>
              <option>Aktif</option>
              <option>Nonaktif</option>
            </select>
          </div>
          <div className="filter-actions">
            <button type="button" className="btn btn-green" onClick={handleRefresh}>Segarkan</button>
            <button type="button" className="btn btn-blue" onClick={exportCSV}>Export CSV</button>
            <button type="button" className="btn btn-blue" onClick={exportPDF}>Export PDF</button>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Bulan/Tahun</th>
              <th>Total Pesanan</th>
              <th>Produk Terjual</th>
              <th>Total Pendapatan</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.no}>
                <td>{row.no}</td>
                <td>{row.bulan}</td>
                <td>{row.pesanan}</td>
                <td>{row.terjual}</td>
                <td>{row.pendapatan}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <div className="table-info">
            <strong>Total</strong>
            <p>Menampilkan 5 data dari total 5 data</p>
          </div>
          <div className="pagination">
            <select><option>10</option></select>
            <span className="page-num">1</span>
            <button type="button">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
