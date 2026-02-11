# 🏥 Aplikasi Stok Opname Darah (Blood Bank Inventory System)

Aplikasi manajemen inventori bank darah rumah sakit yang komprehensif, dibangun dengan React.js dan Material-UI.

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Struktur Aplikasi](#-struktur-aplikasi)
- [Panduan Penggunaan](#-panduan-penggunaan)
- [API Integration](#-api-integration)
- [Komponen & Services](#-komponen--services)

---

## ✨ Fitur Utama

### 1. **Dashboard Real-time** 📊
- Monitoring stok darah per golongan dan komponen
- Alert untuk darah yang akan expired (≤3 hari)
- Statistik total stok tersedia, expired, dan distribusi
- Visualisasi stok dengan color coding:
  - 🟢 Hijau: Stok aman (≥3 kantong)
  - 🟡 Kuning: Stok menipis (<3 kantong)
  - 🔴 Merah: Stok kosong (0 kantong)

### 2. **Master Data** 🗂️

#### a. Komponen Darah
- Whole Blood (WB) - 35 hari
- Packed Red Cell (PRC) - 42 hari
- Thrombocyte Concentrate (TC) - 5 hari
- Fresh Frozen Plasma (FFP) - 365 hari
- Cryoprecipitate (CRYO) - 365 hari

#### b. Supplier/PMI
- Manajemen data PMI dan donor
- Informasi kontak lengkap

#### c. Ruangan
- IGD, Rawat Inap, ICU, Operasi, dll.
- Status aktif/non-aktif

### 3. **Transaksi Darah Masuk** 📥
- Input nomor kantong (unique)
- Pemilihan golongan darah (A, B, AB, O)
- Pemilihan rhesus (+/-)
- Pemilihan komponen darah
- Auto-calculate tanggal expired berdasarkan komponen
- Volume darah (ml)
- Supplier/PMI asal

**Validasi:**
- Nomor kantong harus unik
- Tanggal expired otomatis berdasarkan masa simpan komponen

### 4. **Transaksi Darah Keluar** 📤
- Search & select kantong darah yang tersedia
- Input data pasien (nama, no. rekam medis)
- Pilih ruangan tujuan
- Nama dokter penanggung jawab
- Nama petugas yang mengeluarkan
- Keterangan indikasi penggunaan

**Features:**
- Autocomplete untuk pencarian kantong darah
- Menampilkan detail darah (golongan, komponen, expired date)
- Auto-update status darah menjadi "keluar"

### 5. **Stok Opname** ✅
Proses pencocokan stok sistem dengan kondisi fisik di lemari pendingin.

#### Workflow:
1. **Buat Stok Opname Baru**
   - Input periode (contoh: Januari 2026)
   - Nama petugas
   - Sistem otomatis generate daftar semua darah "tersedia"

2. **Pengecekan Fisik**
   - Petugas cek fisik setiap kantong
   - Tandai status: "Ada" atau "Tidak Ada"
   - Progress tracking real-time

3. **Finalisasi**
   - Selesaikan stok opname setelah 100% tercek
   - Input nama pejabat yang menyetujui
   - Sistem hitung selisih otomatis
   - Generate berita acara

**Output:**
- Total sistem vs total fisik
- Selisih (discrepancy)
- Status: Draft atau Selesai
- Timestamp approval

---

## 🛠️ Teknologi

### Frontend Stack:
```json
{
  "react": "19.2.3",
  "react-router-dom": "7.11.0",
  "@mui/material": "7.3.6",
  "formik": "2.4.9",
  "yup": "1.7.1",
  "axios": "1.13.2",
  "react-toastify": "11.0.5",
  "jwt-decode": "4.0.0"
}
```

### Build Tool:
- **Vite** 7.3.0 - Fast build & hot reload

---

## 📁 Struktur Aplikasi

```
src/
├── api/
│   └── axios.js                 # Axios instance & interceptors
├── components/
│   ├── @extended/               # Extended components
│   ├── cards/                   # Card components
│   ├── tablesearch/             # Table components
│   └── MainCard.jsx             # Main card wrapper
├── contexts/
│   └── AuthContext.jsx          # Authentication context
├── data/
│   └── mockData.js              # Mock data untuk development
├── hooks/
│   └── useBloodBank.js          # Custom hooks (useDataFetch, useFormSubmit, useDelete)
├── layout/
│   └── Dashboard/               # Dashboard layout
├── menu-items/
│   ├── dashboard.jsx            # Menu configuration
│   └── index.jsx                # Menu items export
├── pages/
│   ├── auth/
│   │   └── Login.jsx            # Login page
│   ├── dashboard/
│   │   ├── default.jsx          # Dashboard redirect
│   │   └── BloodBankDashboard.jsx # Main dashboard
│   ├── master/
│   │   ├── KomponenDarah.jsx    # Komponen darah CRUD
│   │   ├── Supplier.jsx         # Supplier/PMI CRUD
│   │   └── Ruangan.jsx          # Ruangan CRUD
│   ├── transaksi/
│   │   ├── DarahMasuk.jsx       # Blood in transaction
│   │   └── DarahKeluar.jsx      # Blood out transaction
│   └── stokopname/
│       ├── StokOpname.jsx       # Stock opname list
│       └── StokOpnameDetail.jsx # Stock opname detail & checking
├── routes/
│   ├── index.jsx                # Main routes
│   ├── LoginRoutes.jsx          # Auth routes
│   └── MainRoutes.jsx           # Protected routes
├── services/
│   └── bloodBank.service.js     # All API services
├── utils/
│   ├── dateUtils.js             # Date formatting utilities
│   ├── errorHandler.js          # Error handling utilities
│   └── route-guard/
│       └── AuthGuard.jsx        # Route protection
└── App.jsx                      # Main app component
```

---

## 🚀 Panduan Penggunaan

### 1. Login
```
Username: (sesuai backend)
Password: (sesuai backend)
```

### 2. Dashboard
- Lihat overview stok darah
- Monitor darah yang akan expired
- Check stok per golongan & komponen

### 3. Input Darah Masuk
1. Klik "Input Darah Masuk"
2. Masukkan nomor kantong (contoh: BD000051)
3. Pilih golongan darah dan rhesus
4. Pilih komponen (tanggal expired auto-fill)
5. Pilih supplier/PMI
6. Input volume (ml)
7. Simpan

### 4. Distribusi Darah Keluar
1. Klik "Distribusi Darah"
2. Search dan pilih kantong darah
3. Input data pasien
4. Pilih ruangan tujuan
5. Input nama dokter dan petugas
6. Simpan

### 5. Stok Opname
1. Klik "Buat Stok Opname"
2. Input periode dan nama petugas
3. Sistem generate daftar darah tersedia
4. Lakukan pengecekan fisik satu per satu
5. Tandai status: Ada/Tidak Ada
6. Setelah 100% selesai, klik "Selesaikan Stok Opname"
7. Input nama pejabat yang menyetujui

---

## 🔌 API Integration

### Current Status
Aplikasi saat ini menggunakan **mock data** untuk development. Semua services di `bloodBank.service.js` sudah siap untuk integrasi dengan backend API.

### API Endpoints (Ready to Integrate)

#### Master Data
```javascript
GET    /api/master/golongan-darah
GET    /api/master/rhesus
GET    /api/master/komponen-darah
POST   /api/master/komponen-darah
PUT    /api/master/komponen-darah/:id
DELETE /api/master/komponen-darah/:id

GET    /api/master/supplier
POST   /api/master/supplier
PUT    /api/master/supplier/:id
DELETE /api/master/supplier/:id

GET    /api/master/ruangan
POST   /api/master/ruangan
PUT    /api/master/ruangan/:id
DELETE /api/master/ruangan/:id
```

#### Inventory
```javascript
GET    /api/blood?status=tersedia&golongan=A&komponen=PRC
GET    /api/blood/:id
POST   /api/blood (darah masuk)
PUT    /api/blood/:id/status
```

#### Transaksi
```javascript
GET    /api/blood-out
POST   /api/blood-out (distribusi darah)
```

#### Stok Opname
```javascript
GET    /api/stok-opname
GET    /api/stok-opname/:id
POST   /api/stok-opname
PUT    /api/stok-opname/:id/detail
POST   /api/stok-opname/:id/finalize
```

#### Dashboard
```javascript
GET    /api/dashboard/stats
GET    /api/dashboard/stock?golongan=A&rhesus=+&komponen=PRC
```

### Cara Integrasi dengan Backend

1. **Update base URL** di `.env`:
```env
VITE_API_BASE_URL=http://your-backend-url/api
```

2. **Replace mock service** di `bloodBank.service.js`:
```javascript
// Dari:
export const bloodInventoryService = {
  getAllBlood: async (filters = {}) => {
    await delay();
    return { success: true, data: bloodData };
  }
};

// Menjadi:
export const bloodInventoryService = {
  getAllBlood: async (filters = {}) => {
    const response = await api.get('/blood', { params: filters });
    return response.data;
  }
};
```

3. **Format Response Backend** (Expected):
```json
{
  "success": true,
  "data": [...],
  "message": "Optional message"
}
```

---

## 🧩 Komponen & Services

### Custom Hooks

#### 1. `useDataFetch`
```javascript
const { data, loading, error, refetch } = useDataFetch(fetchFunction);
```
- Auto fetch on mount
- Loading & error states
- Refetch capability

#### 2. `useFormSubmit`
```javascript
const { submit, loading, error } = useFormSubmit(submitFunction, onSuccess);
```
- Handle form submission
- Auto error handling
- Success callback

#### 3. `useDelete`
```javascript
const { deleteItem, loading } = useDelete(deleteFunction, onSuccess);
```
- Confirmation dialog
- Auto success message
- Callback on success

### Utilities

#### Date Utils
```javascript
formatDate(date)              // DD/MM/YYYY
formatDateTime(date)          // DD/MM/YYYY HH:MM
getDaysUntilExpiry(date)      // Number of days
isExpiringSoon(date)          // Boolean (≤3 days)
isExpired(date)               // Boolean
getTodayDate()                // YYYY-MM-DD
addDays(date, days)           // Calculate future date
```

#### Error Handler
```javascript
handleApiError(error, customMessage)
showSuccess(message)
showInfo(message)
showWarning(message)
```

---

## 🎨 UI/UX Features

### Color Coding
- **Success (Green)**: Stok aman, status tersedia
- **Warning (Orange)**: Stok menipis, akan expired
- **Error (Red)**: Stok kosong, expired
- **Info (Blue)**: Informasi umum
- **Secondary (Purple)**: Golongan darah

### Notifications
- Toast notifications untuk semua aksi
- Success, error, warning, info messages
- Auto-dismiss after 5 seconds

### Form Validation
- Required fields marked with *
- Real-time validation
- Error messages in Indonesian

### Responsive Design
- Mobile-friendly
- Tablet optimized
- Desktop full-featured

---

## 🔐 Security Features

1. **JWT Authentication**
   - Token stored in localStorage
   - Auto-inject to requests
   - Token expiry validation

2. **Protected Routes**
   - AuthGuard for all main routes
   - Auto-redirect to login if not authenticated

3. **401 Handling**
   - Auto-logout on 401
   - Redirect to login page

4. **Environment Variables**
   - API URL in .env
   - .env excluded from git

---

## 📝 Notes

### Mock Data Stats
- 50 kantong darah sample
- 4 golongan darah (A, B, AB, O)
- 2 rhesus (+, -)
- 5 komponen darah
- 4 supplier/PMI
- 7 ruangan

### Business Rules Implemented
1. ✅ Nomor kantong harus unik
2. ✅ Tanggal expired auto-calculate dari komponen
3. ✅ Darah keluar hanya dari stok tersedia
4. ✅ Status darah: tersedia, keluar, expired, rusak
5. ✅ Alert H-3 sebelum expired
6. ✅ Stok opname harus 100% sebelum finalize
7. ✅ Audit trail (petugas, approved_by, timestamp)

---

## 🚀 Roadmap (Future Enhancements)

- [ ] QR Code per kantong darah
- [ ] Barcode scanner untuk input/output
- [ ] WhatsApp notification untuk stok kritis
- [ ] Export laporan ke PDF/Excel
- [ ] Grafik tren penggunaan darah
- [ ] Integrasi dengan SIMRS
- [ ] Role-based permissions (Admin, Petugas, Viewer)
- [ ] Multi-language support
- [ ] Dark mode

---

## 👨‍💻 Developer

**Built with ❤️ by AI Assistant**

Aplikasi ini dibangun menggunakan template Mantis Material-UI React Dashboard dan disesuaikan untuk kebutuhan Blood Bank Inventory System.

---

## 📞 Support

Untuk pertanyaan atau issues, silakan hubungi tim IT Rumah Sakit.

---

**Version**: 1.0.0  
**Last Updated**: February 11, 2026  
**Status**: Development (Mock Data) - Ready for Backend Integration
