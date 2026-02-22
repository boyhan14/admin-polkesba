import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts'

const aktifVsNon = [
  { name: 'User Aktif', value: 380 },
  { name: 'User Tidak Aktif', value: 180 },
]
const pertumbuhan = [
  { month: 'Jan', value: 80 },
  { month: 'Feb', value: 95 },
  { month: 'Mar', value: 110 },
  { month: 'Apr', value: 130 },
  { month: 'Mei', value: 155 },
  { month: 'Jun', value: 180 },
]
const distribusiAktivitas = [
  { name: 'User Aktif', value: 70 },
  { name: 'User Tidak Aktif', value: 30 },
]
const colorsPie = ['#2196F3', '#ff9800']

export default function DataUser() {
  return (
    <div className="data-viz-page">
      <div className="page-title">
        <h1>Data Visualisai <span className="subtitle">User</span></h1>
      </div>

      <div className="card">
        <div className="card-title">Perbandingan User Aktif dan Tidak Aktif</div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={aktifVsNon}>
              <XAxis dataKey="name" name="Status User" />
              <YAxis name="Jumlah User" domain={[0, 400]} />
              <Tooltip />
              <Bar dataKey="value" fill="#2196F3" name="Jumlah User" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Pertumbuhan User Baru per Bulan</div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pertumbuhan}>
              <XAxis dataKey="month" name="Bulan" />
              <YAxis name="Jumlah User Baru" domain={[80, 180]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={2} dot={{ r: 4 }} name="Jumlah User Baru" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 400 }}>
        <div className="card-title">Distribusi Aktivitas User</div>
        <PieChart width={400} height={280}>
          <Pie data={distribusiAktivitas} cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name} ${value}%`}>
            {distribusiAktivitas.map((e, i) => <Cell key={i} fill={colorsPie[i]} />)}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    </div>
  )
}
