import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const mingguData = [
  { name: 'Minggu 1', value: 5000000 },
  { name: 'Minggu 2', value: 35000000 },
  { name: 'Minggu 3', value: 55000000 },
  { name: 'Minggu 4', value: 70000000 },
]
const bulanData = [
  { name: 'Jan', value: 20000000 },
  { name: 'Feb', value: 35000000 },
  { name: 'Mar', value: 45000000 },
  { name: 'Apr', value: 60000000 },
  { name: 'May', value: 55000000 },
  { name: 'Jun', value: 80000000 },
  { name: 'Jul', value: 90000000 },
  { name: 'Aug', value: 120000000 },
  { name: 'Sep', value: 110000000 },
  { name: 'Oct', value: 150000000 },
  { name: 'Nov', value: 180000000 },
  { name: 'Des', value: 200000000 },
]
const tahunData = [
  { name: '2022', value: 300000000 },
  { name: '2023', value: 800000000 },
  { name: '2024', value: 1200000000 },
  { name: '2025', value: 2000000000 },
]
const pieMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const pieColors = ['#ff9800', '#2196F3', '#5bc0de', '#4CAF50', '#ffeb3b', '#9c27b0', '#f44336', '#00bcd4', '#8bc34a', '#e91e63', '#673ab7', '#009688']
const pieData = useMemo(() => pieMonths.map((m, i) => ({ name: m, value: +(7 + Math.random() * 4).toFixed(2) })), [])

export default function DataPenjualan() {
  return (
    <div className="data-viz-page">
      <div className="page-title">
        <h1>Data Visualisai <span className="subtitle">Penjualan</span></h1>
      </div>

      <div className="card">
        <div className="card-title">Penjualan Per Minggu (Rp)</div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mingguData}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => (v / 1e6) + ' Jt'} />
              <Tooltip formatter={(v) => 'Rp ' + v.toLocaleString('id-ID')} />
              <Bar dataKey="value" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Penjualan Per Bulan (Rp)</div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bulanData}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => (v / 1e7) + 'e7'} />
              <Tooltip formatter={(v) => 'Rp ' + v.toLocaleString('id-ID')} />
              <Bar dataKey="value" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Penjualan Per Tahun (Rp)</div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tahunData}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => (v / 1e9) + 'e9'} />
              <Tooltip formatter={(v) => 'Rp ' + v.toLocaleString('id-ID')} />
              <Bar dataKey="value" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-row-2">
        <div className="card">
          <div className="card-title">Distribusi Penjualan Tahunan (Pie Chart)</div>
          <PieChart width={400} height={300}>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}>
              {pieData.map((e, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
            </Pie>
            <Legend />
          </PieChart>
        </div>
        <div className="card">
          <div className="card-title">Distribusi Penjualan Tahunan (Donut Chart)</div>
          <PieChart width={400} height={300}>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}>
              {pieData.map((e, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  )
}
