import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts'

const terlaris = [
  { name: 'Sabun Skafasa', value: 280 },
  { name: 'Deterjen Skalasa', value: 220 },
  { name: 'Parfum Skafasa', value: 180 },
  { name: 'Sabun Cuci', value: 150 },
  { name: 'Sabun Piring', value: 120 },
  { name: 'Produk Lainnya', value: 80 },
]
const trenBulanan = [
  { month: 'Jan', value: 140 },
  { month: 'Feb', value: 160 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 200 },
  { month: 'Mei', value: 230 },
  { month: 'Jun', value: 260 },
]
const stok = [
  { name: 'Sabun Skafasa', value: 120 },
  { name: 'Deterjen Skalasa', value: 90 },
  { name: 'Parfum Skafasa', value: 70 },
  { name: 'Sabun Cuci', value: 100 },
  { name: 'Sabun Piring', value: 60 },
  { name: 'Produk Lainnya', value: 40 },
]
const distribusi = [
  { name: 'Sabun Skafasa', value: 24.8 },
  { name: 'Deterjen Skafasa', value: 21.5 },
  { name: 'Parfum Skafasa', value: 16.2 },
  { name: 'Sabun Cuci', value: 14.6 },
  { name: 'Sabun Piring', value: 12.3 },
  { name: 'Produk Lainnya', value: 10.8 },
]
const distColors = ['#2196F3', '#ff9800', '#4CAF50', '#f44336', '#9c27b0', '#8d6e63']

export default function DataProduk() {
  return (
    <div className="data-viz-page">
      <div className="page-title">
        <h1>Data Visualisai Produk</h1>
      </div>

      <div className="card">
        <div className="card-title">Produk Terlaris</div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={terlaris} layout="vertical" margin={{ left: 100 }}>
              <XAxis type="number" name="Jumlah Terjual" />
              <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#2196F3" name="Jumlah Terjual" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Tren Penjualan Bulanan</div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trenBulanan}>
              <XAxis dataKey="month" name="Bulan" />
              <YAxis name="Total Penjualan" domain={[120, 280]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Stok Produk</div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stok} margin={{ left: 100 }}>
              <XAxis dataKey="name" angle={-30} textAnchor="end" height={80} tick={{ fontSize: 11 }} />
              <YAxis name="Jumlah Stok" domain={[0, 140]} />
              <Tooltip />
              <Bar dataKey="value" fill="#2196F3" name="Jumlah Stok" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Distribusi Penjualan Produk</div>
        <PieChart width={500} height={300}>
          <Pie data={distribusi} cx="50%" cy="50%" outerRadius={100} label={({ name, value }) => `${name} ${value}%`}>
            {distribusi.map((e, i) => <Cell key={i} fill={distColors[i]} />)}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    </div>
  )
}
