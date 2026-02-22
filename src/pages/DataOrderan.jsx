import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const mingguData = [
  { name: 'Minggu 1', value: 4000000 },
  { name: 'Minggu 2', value: 8000000 },
  { name: 'Minggu 3', value: 10000000 },
  { name: 'Minggu 4', value: 12000000 },
]
const bulanData = [
  { name: 'Jan', value: 15000000 },
  { name: 'Feb', value: 25000000 },
  { name: 'Mar', value: 35000000 },
  { name: 'Apr', value: 45000000 },
  { name: 'May', value: 55000000 },
  { name: 'Jun', value: 60000000 },
]
const tahunData = [
  { name: '2023', value: 15000000 },
  { name: '2024', value: 55000000 },
  { name: '2025', value: 60000000 },
]
const pieBulan = [
  { name: 'Jan', value: 17.1 },
  { name: 'Feb', value: 18.8 },
  { name: 'Mar', value: 18.8 },
  { name: 'Apr', value: 14.9 },
  { name: 'May', value: 11.8 },
  { name: 'Jun', value: 18.5 },
]
const donutTahun = [
  { name: '2023', value: 19.4 },
  { name: '2024', value: 70.0 },
  { name: '2025', value: 10.6 },
]
const colorsPie = ['#2196F3', '#8d6e63', '#9c27b0', '#f44336', '#4CAF50', '#ff9800']
const colorsDonut = ['#2196F3', '#4CAF50', '#ff9800']

export default function DataOrderan() {
  return (
    <div className="data-viz-page">
      <div className="page-title">
        <h1>Data Visualisai <span className="subtitle">Orderan</span></h1>
      </div>

      <div className="card">
        <div className="card-title">Grafik Orderan Per Minggu</div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mingguData}>
              <XAxis dataKey="name" label={{ value: 'Periode', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Rupiah (Rp)', angle: -90, position: 'insideLeft' }} tickFormatter={(v) => (v / 1e6) + 'e6'} />
              <Tooltip formatter={(v) => 'Rp ' + v.toLocaleString('id-ID')} />
              <Bar dataKey="value" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Grafik Orderan Per Bulan</div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bulanData}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => (v / 1e6) + 'e6'} />
              <Tooltip formatter={(v) => 'Rp ' + v.toLocaleString('id-ID')} />
              <Bar dataKey="value" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Grafik Orderan Per Tahun</div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tahunData}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => (v / 1e6) + 'e6'} />
              <Tooltip formatter={(v) => 'Rp ' + v.toLocaleString('id-ID')} />
              <Bar dataKey="value" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-row-2">
        <div className="card">
          <div className="card-title">Distribusi Orderan Per Bulan</div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieBulan} cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name} ${value}%`}>
                  {pieBulan.map((e, i) => <Cell key={i} fill={colorsPie[i]} />)}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Distribusi Orderan Per Tahun (Donut Chart)</div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donutTahun} cx="50%" cy="50%" innerRadius={50} outerRadius={90} label={({ name, value }) => `${name} ${value}%`}>
                  {donutTahun.map((e, i) => <Cell key={i} fill={colorsDonut[i]} />)}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
