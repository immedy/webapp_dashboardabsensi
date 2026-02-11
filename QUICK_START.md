# 🚀 Quick Start Guide - Blood Bank System

## Langkah-langkah Menjalankan Aplikasi

### 1. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 2. Setup Environment Variables

Copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Atau buat file `.env` dengan isi:

```env
VITE_APP_VERSION = v2.0.1
GENERATE_SOURCEMAP = false
VITE_APP_BASE_NAME = /webapp
VITE_API_BASE_URL = http://localhost:8080
```

### 3. Jalankan Development Server

```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan berjalan di: `http://localhost:3000/webapp`

### 4. Login

**Mock Login (tanpa backend):**
- Aplikasi saat ini menggunakan mock data
- Login akan berhasil dengan kredensial apa pun
- Untuk mengaktifkan real authentication, hubungkan ke backend API

---

## 📂 File-file Penting yang Baru

### Services
- `src/services/bloodBank.service.js` - Semua API services (mock)
- `src/data/mockData.js` - Mock data untuk development

### Pages
- `src/pages/dashboard/BloodBankDashboard.jsx` - Dashboard utama
- `src/pages/master/KomponenDarah.jsx` - Master komponen darah
- `src/pages/master/Supplier.jsx` - Master supplier/PMI
- `src/pages/master/Ruangan.jsx` - Master ruangan
- `src/pages/transaksi/DarahMasuk.jsx` - Input darah masuk
- `src/pages/transaksi/DarahKeluar.jsx` - Distribusi darah keluar
- `src/pages/stokopname/StokOpname.jsx` - Daftar stok opname
- `src/pages/stokopname/StokOpnameDetail.jsx` - Detail & checking stok opname

### Utilities
- `src/utils/dateUtils.js` - Utility untuk date formatting
- `src/utils/errorHandler.js` - Error & notification handler
- `src/hooks/useBloodBank.js` - Custom hooks untuk data fetching

---

## 🔄 Integrasi dengan Backend

### Langkah 1: Update Environment
```env
VITE_API_BASE_URL = http://your-backend-url/api
```

### Langkah 2: Update AuthContext
Di `src/contexts/AuthContext.jsx`, update endpoint login:
```javascript
const res = await api.post('/auth/login', { username, password });
```

### Langkah 3: Replace Mock Services
Di `src/services/bloodBank.service.js`, ganti mock implementation dengan real API calls.

**Contoh:**
```javascript
// MOCK (current)
export const bloodInventoryService = {
  getAllBlood: async (filters = {}) => {
    await delay();
    let filtered = [...bloodData];
    // ... filtering logic
    return { success: true, data: filtered };
  }
};

// REAL API
export const bloodInventoryService = {
  getAllBlood: async (filters = {}) => {
    const response = await api.get('/blood', { params: filters });
    return response.data;
  }
};
```

---

## 🧪 Testing dengan Mock Data

### Data Tersedia:
- **50 kantong darah** dengan berbagai golongan dan komponen
- **4 supplier/PMI**
- **7 ruangan**
- **5 komponen darah**
- **2 transaksi darah keluar**
- **2 stok opname** (1 selesai, 1 draft)

### Coba Fitur:
1. ✅ Dashboard - Lihat statistik dan alert expired
2. ✅ Darah Masuk - Input kantong baru (BD000051+)
3. ✅ Darah Keluar - Distribusi ke pasien
4. ✅ Stok Opname - Buat baru dan lakukan pengecekan
5. ✅ Master Data - CRUD komponen, supplier, ruangan

---

## 🐛 Troubleshooting

### Port sudah digunakan
```bash
# Ubah port di vite.config.mjs
server: {
  port: 3001, // ganti port
}
```

### Module not found
```bash
# Clear node_modules dan reinstall
rm -rf node_modules
npm install
```

### Build Error
```bash
# Clear cache dan rebuild
npm run build --force
```

---

## 📦 Build untuk Production

```bash
npm run build
# atau
yarn build
```

Output ada di folder `dist/`

---

## 🎯 Next Steps

1. [ ] Hubungkan ke backend API
2. [ ] Test semua fitur dengan real data
3. [ ] Setup production environment
4. [ ] Deploy ke server
5. [ ] Training user

---

**Happy Coding! 🩸💻**
