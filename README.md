# Sistem Absensi OSIS - Versi HTML/CSS/JavaScript

**Aplikasi web untuk mengelola sistem absensi OSIS tanpa perlu backend server!**

Versi ini menggunakan **localStorage** di browser untuk menyimpan data, sehingga Anda bisa langsung membuka file HTML tanpa perlu Node.js atau server.

## 🚀 Fitur Utama

✅ **Tanpa Server** - Buka langsung file HTML, tidak perlu Node.js/Express  
✅ **Data Tersimpan di Browser** - Menggunakan localStorage untuk persistence  
✅ **Form Absensi** - Anggota bisa melakukan absensi dengan status "Hadir" atau "Telat"  
✅ **Kode Akses Harian** - Admin bisa mengubah kode akses setiap hari  
✅ **Manajemen Anggota** - Tambah/hapus anggota OSIS  
✅ **Rekapan Otomatis** - Statistik kehadiran terupdate otomatis  
✅ **Admin Dashboard** - Area khusus untuk admin dengan fitur lengkap  
✅ **Backup & Restore** - Export/import data dalam format JSON  

## 📋 Cara Membuka

### Metode 1: Langsung dari File Manager
1. Buka folder `absensi-osis-html`
2. Double-click file `index.html`
3. Browser akan otomatis membuka halaman absensi

### Metode 2: Dari Browser
1. Buka browser (Chrome, Firefox, Safari, Edge, dll)
2. Tekan `Ctrl + O` (Windows) atau `Cmd + O` (Mac)
3. Pilih file `index.html` dari folder `absensi-osis-html`

### Metode 3: Dengan Server Lokal (Optional)
Jika ingin menjalankan dengan server:

**Windows:**
```bash
cd absensi-osis-html
python -m http.server 8000
```

Lalu buka: `http://localhost:8000`

**Mac/Linux:**
```bash
cd absensi-osis-html
python3 -m http.server 8000
```

## 📁 Struktur File

```
absensi-osis-html/
├── index.html                ← Halaman Form Absensi
├── recap.html                ← Halaman Rekapan
├── recap-detail.html         ← Halaman Detail Rekapan
├── admin-login.html          ← Halaman Login Admin
├── admin-dashboard.html      ← Dashboard Admin
├── admin-set-code.html       ← Atur Kode Akses
├── admin-members.html        ← Kelola Anggota
├── css/
│   └── style.css             ← Styling untuk semua halaman
└── js/
    ├── storage.js            ← Sistem database (localStorage)
    └── app.js                ← Fungsi-fungsi utility
```

## 🎯 Menu Utama

| Halaman | URL | Untuk |
|---------|-----|-------|
| Form Absensi | `index.html` | Anggota melakukan absensi |
| Rekapan | `recap.html` | Lihat statistik kehadiran |
| Detail Rekapan | `recap-detail.html` | Lihat detail per anggota |
| Admin Login | `admin-login.html` | Login admin |
| Admin Dashboard | `admin-dashboard.html` | Dashboard admin |
| Atur Kode Akses | `admin-set-code.html` | Manajemen kode akses |
| Kelola Anggota | `admin-members.html` | Tambah/hapus anggota |

## 🔐 Default Admin Password

```
admin123
```

### Cara Mengubah Password Admin

1. Login ke Admin
2. Di Admin Dashboard, klik tombol **"Ubah Password Admin"**
3. Masukkan password lama: `admin123`
4. Masukkan password baru
5. Konfirmasi password baru

## 📊 Cara Menggunakan

### Sebagai ANGGOTA

1. Buka `index.html` (Halaman Absensi)
2. Pilih nama Anda dari dropdown
3. Pilih status: **Hadir** atau **Telat**
4. Masukkan **kode akses** yang diberikan admin
5. Klik **"Kirim Absensi"**
6. Sistem akan menampilkan rekapan real-time

### Sebagai ADMIN

#### Login
1. Buka `admin-login.html`
2. Masukkan password: `admin123`
3. Akan redirect ke dashboard admin

#### Setiap Hari - Atur Kode Akses
1. Di Dashboard Admin, klik **"Atur Kode Akses"**
2. Buat kode akses baru (misal: `OSIS2024`)
3. Bisa gunakan tombol **"Generate"** untuk kode random
4. Klik **"Simpan Kode Akses"**
5. Bagikan kode ke semua anggota

#### Kelola Anggota
1. Di Dashboard Admin, klik **"Kelola Anggota"**
2. **Tambah Anggota:**
   - Masukkan nama
   - Masukkan posisi (optional)
   - Klik "Tambah Anggota"
3. **Hapus Anggota:**
   - Klik tombol "Hapus" di tabel

#### Lihat Rekapan
1. Di Dashboard Admin, klik **"Lihat Rekapan"**
2. Filter berdasarkan tanggal
3. Lihat statistik kehadiran per anggota

## 💾 Backup & Restore Data

### Backup Data
1. Go to Admin Dashboard
2. Klik tombol **"📥 Backup Data"**
3. File JSON akan diunduh (misal: `absensi-backup-2024-04-08.json`)
4. Simpan file ini untuk keamanan

### Restore Data (Jika Data Hilang)
1. Go to Admin Dashboard
2. Klik tombol **"📤 Restore Data"**
3. Pilih file backup `.json` yang sebelumnya diunduh
4. Klik OK pada konfirmasi
5. Data akan di-restore otomatis

## 🔄 Penyimpanan Data

Data disimpan menggunakan **localStorage** browser:
- **Chrome/Edge/Firefox:** Simpan hingga 5-10MB
- **Safari:** Simpan hingga 50MB

Data akan tetap ada selama Anda tidak menghapus cache browser.

### Cara Backup Manual

Jika koleksi data penting, export sebagai JSON:
1. Admin Dashboard → "📥 Backup Data"
2. Simpan file JSON di tempat aman
3. Bisa di-restore nanti jika diperlukan

## ⚠️ Penting untuk Diketahui

1. **Data Lokal** - Data hanya tersimpan di computer/device Anda. Jika buka dari device lain, data tidak ada.

2. **Clear Cache** - Jangan hapus cache browser, atau data akan hilang!

3. **Backup Rutin** - Backup data secara berkala menggunakan fitur backup.

4. **Multi Device** - Jika ingin akses dari banyak device, gunakan versi Node.js di folder `absensi-osis/`

5. **Data Maksimal** - Untuk dataset sangat besar (>1000 record), gunakan versi database untuk performa lebih baik.

## 🌐 Akses dari Device Lain

Jika ingin mengakses dari device lain di jaringan yang sama:

### Setup Server Lokal (Windows)
```bash
cd absensi-osis-html
python -m http.server 8000
```

### Setup Server Lokal (Mac/Linux)
```bash
cd absensi-osis-html
python3 -m http.server 8000
```

Kemudian dari device lain:
```
http://[IP-ADDRESS]:8000
```

Cari IP address dengan:
- **Windows:** `ipconfig` di CMD
- **Mac/Linux:** `ifconfig` di terminal

## 🔒 Keamanan

⚠️ **PENTING:**
- Password admin bisa diubah di halaman admin
- Jangan bagikan password admin ke semua orang
- Backup data secara berkala
- Gunakan LokalStorage yang aman di browser

## 📌 Contoh Kode Akses Harian

- OSIS2024
- ABSEN-PT1
- HADIR001
- 654321
- OSISPT

## 🆘 Troubleshooting

### Data tidak muncul setelah refresh
- Pastikan localStorage browser tidak di-clear
- Coba buka devtools (F12) → Application → localStorage

### Lupa password admin
- Password default adalah `admin123`
- Jika sudah diubah, sayangnya tidak ada reset option
- Solusi: Clear localStorage dan setup ulang (data akan hilang)

### Halaman error/blank
- Clear browser cache (Ctrl+Shift+Del)
- Refresh halaman (Ctrl+F5)
- Coba browser lain

### Data tiba-tiba hilang
- Gunakan file backup untuk restore
- Jangan clear localStorage browser

## 💡 Tips

1. **Generate Kode Acak** - Klik tombol "🎲 Generate" untuk membuat kode random
2. **Cetak Rekapan** - Gunakan tombol "🖨️ Cetak" untuk print laporan
3. **Export Data** - Backup data secara berkala
4. **Mobile Friendly** - Buka dari mobile juga bisa!

## 📞 Support

Jika ada pertanyaan atau masalah, cek dokumentasi atau buka console browser (F12) untuk melihat error message.

---

**Selamat menggunakan Sistem Absensi OSIS!** 🎓

**Versi:** HTML/CSS/JavaScript (Tanpa Server)  
**Terakhir Update:** April 2024
