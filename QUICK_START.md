# Quick Start - Absensi OSIS HTML/CSS/JavaScript

## ⚡ Langsung Buka File

1. **Buka folder:** `absensi-osis-html`
2. **Double-click:** `index.html`
3. **Selesai!** Website sudah berjalan di browser Anda

Atau buka dengan browser:
- Tekan `Ctrl + O` (Windows) / `Cmd + O` (Mac)
- Cari file `index.html`
- OK

## 📍 Link Halaman

| Halaman | Link |
|---------|------|
| Absensi | `index.html` |
| Rekapan | `recap.html` |
| Detail Rekapan | `recap-detail.html` |
| Admin Login | `admin-login.html` |
| Admin Dashboard | `admin-dashboard.html` |

## 🔐 Login Admin

**Password:** `admin123`

## 🎯 Workflow Harian

### Pagi (Admin)
1. Buka `admin-login.html`
2. Login dengan password `admin123`
3. Klik "Atur Kode Akses"
4. Buat kode baru (misal: OSIS2024)
5. Bagikan kode ke semua anggota

### Saat Absensi (Anggota)
1. Buka `index.html`
2. Pilih nama → status → masukkan kode
3. Submit

### Akhir Hari (Admin)
1. Buka `recap.html`
2. Lihat siapa hadir/telat
3. Cetak laporan jika perlu

## 💾 Data

- **Disimpan di:** Browser localStorage
- **Aman dapat:** Tahu soal clear cache
- **Backup:** Admin Dashboard → "Backup Data"

## ⚙️ File Penting

```
absensi-osis-html/
├── index.html              ← Buka ini pertama kali
├── admin-login.html        ← Untuk admin
├── js/storage.js           ← Database (jangan edit)
├── css/style.css           ← Styling (jangan edit)
└── README.md               ← Dokumentasi lengkap
```

## 🆘 Masalah?

- **Data tidak muncul?** → Refresh browser (Ctrl+F5)
- **Lupa password?** → Default: `admin123`
- **Data hilang?** → Restore dari backup file

## 🌐 Server Lokal (Optional)

Jika ingin akses dari device lain:

```bash
cd absensi-osis-html
python -m http.server 8000
```

Buka: `http://localhost:8000`

---

**Happy Absensi!** 📋✨
