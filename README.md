# Admin Polkesba - E-Prokesba

Panel admin untuk aplikasi E-Prokesba, dibuat sesuai desain yang diberikan dengan warna, layout, dan navigasi yang sinkron.

## Cara Menjalankan

1. Pasang Node.js (LTS) jika belum ada.
2. Di folder proyek, jalankan:
   ```bash
   npm install
   npm run dev
   ```
3. Buka browser ke alamat yang ditampilkan (biasanya http://localhost:5173).
4. Untuk masuk ke dashboard, gunakan halaman **Login Admin** (username/password bebas), lalu klik **Masuk**.

## Fitur

- **Login**: Login Admin, Lupa Password, Masukkan Kode OTP (alur lengkap)
- **Dashboard**: Kartu metrik (Orderan Terbaru, Data Melonjak, Registrasi User), Live Chat, My Income (pie chart), Yang Harus Dikerjakan, Kalender, kartu kecil (Rating, Orderan Dibatalkan, dll.)
- **Widgets**: Notification, Recent Activity, Top Produk Terlaris, Summary cards, Stok Hampir Habis, Penjualan Bulanan (line chart), Kalender
- **Data Visualisasi**
  - **Penjualan**: Grafik per minggu/bulan/tahun, Pie & Donut distribusi
  - **Orderan**: Grafik per minggu/bulan/tahun, Distribusi per bulan & tahun (pie/donut)
  - **Produk**: Produk Terlaris, Tren Penjualan Bulanan, Stok Produk, Distribusi Penjualan
  - **User**: User Aktif vs Tidak Aktif, Pertumbuhan User per Bulan, Distribusi Aktivitas
- **Forms**: Kontrol User, Kontrol Produk (Edit/Tambah), Kontrol Kategori, Detail Pesanan
- **Tabel**: Filter Bulan/Tahun/Status, tabel data, Segarkan, Export CSV/PDF, pagination
- **Kalender**: Kalender bulanan, To Do List, Tambah To Do List
- **Kotak Surat**: Daftar pesan, Isi surat, Tambah pesan (Kepada, Subjek, Kirim)
- **Chat langsung**: Daftar kontak, percakapan, input pesan & kirim
- **Pengaturan**: Foto Profil (Unggah/Hapus), Informasi Akun, Simpan/Batal/Keluar

Semua menu di sidebar terhubung ke halaman masing-masing; tombol "Lihat sepenuhnya" dan link mengarah ke halaman yang sesuai. Tombol **Keluar** di Pengaturan akan logout dan mengembalikan ke halaman login.

## Teknologi

- React 18, React Router 6, Vite 5, Recharts (grafik)
