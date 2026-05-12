# Aturan Umum UI dan Struktur Folder

Dokumen ini menjadi patokan umum saat membuat atau merapikan halaman baru di project ini.

Patokan referensi hanya diambil dari area berikut:

- `src/pages/dashboard`
- `src/pages/master`
- `src/pages/stokopname`
- `src/pages/transaksi`
- contoh struktur folder di `src/pages/absensi/input-jadwal`

## 1. Prinsip Umum

- Utamakan memakai komponen yang sudah ada di project sebelum membuat pola UI baru.
- Jaga tampilan tetap konsisten dengan halaman yang sudah ada.
- Kalau kebutuhan UI masih bisa diselesaikan dengan komponen existing, jangan buat komponen baru.
- Gunakan alias import seperti `components/...`, `pages/...`, `services/...`, `hooks/...`.

## 2. Aturan Komponen UI

### 2.1 Pembungkus halaman

- Gunakan `Grid` dari MUI untuk layout utama halaman.
- Gunakan `MainCard` sebagai pembungkus konten utama.
- Judul halaman diletakkan di prop `title` milik `MainCard`.
- Area aksi kanan atas diletakkan di prop `secondary` milik `MainCard`.

Pola umum:

```jsx
<Grid container spacing={3}>
  <Grid size={12}>
    <MainCard title="Judul Halaman" secondary={...}>
      ...
    </MainCard>
  </Grid>
</Grid>
```

### 2.2 Tabel data

- Untuk tabel listing, gunakan `DataTable`.
- Header tabel gunakan `components/tablesearch/TableHead`.
- Pencarian tabel gunakan `components/tablesearch/TableSearch`.
- Kolom aksi gunakan `components/tablesearch/ActionCell`.
- Isi tabel tetap memakai `TableBody`, `TableRow`, dan `TableCell` dari MUI.
- Jika ada status singkat, gunakan `Chip`.
- Jika tabel punya loading, manfaatkan prop `loading` pada `DataTable`.

Komponen patokan:

- `src/components/tablesearch/DataTable.jsx`
- `src/components/tablesearch/TableHead.jsx`
- `src/components/tablesearch/TableSearch.jsx`
- `src/components/tablesearch/ActionCell.jsx`

### 2.3 Tombol aksi

- Tombol tambah/edit/simpan yang ingin diberi efek animasi gunakan `AnimateButton`.
- Tombol ikon di header card mengikuti pola `IconButton` + `Tooltip` + `AnimateButton`.
- Ikon utama mengikuti pola yang sudah dipakai, misalnya dari `@ant-design/icons`.

Pola umum aksi header:

```jsx
<Tooltip title="Tambah Data">
  <AnimateButton>
    <IconButton size="large" color="primary" sx={{ boxShadow: 3 }}>
      <PlusOutlined />
    </IconButton>
  </AnimateButton>
</Tooltip>
```

### 2.4 Input form

- Input teks, angka, email, multiline, dan textarea gunakan `TextField` dari MUI.
- Jika butuh pilihan yang sifatnya mencari atau daftar opsi, gunakan `InputAutoComplete`.
- Jangan langsung membuat select custom baru jika `InputAutoComplete` masih cukup.
- Select sederhana yang opsinya sedikit dan statis masih boleh memakai `TextField select` + `MenuItem`.
- Semua form dialog mengikuti pola `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`, dan isi form disusun dengan `Stack`.

Patokan pemakaian:

- `TextField` untuk input umum
- `InputAutoComplete` untuk field pilihan data/master
- `TextField select` hanya untuk pilihan sederhana dan singkat

### 2.5 Input tanggal dan waktu

- Untuk input tanggal atau range tanggal, gunakan `Flatpickr`.
- Jangan memakai datepicker lain selama kebutuhan masih bisa ditangani `Flatpickr`.
- `Flatpickr` dirender melalui `TextField` agar visual tetap konsisten dengan field lain.

Patokan utama:

- `src/pages/absensi/input-jadwal/jadwal-pegawai/InputJadwalPegawai.jsx`

Pola umum:

```jsx
<Flatpickr
  value={value}
  options={{ mode: 'range', dateFormat: 'Y-m-d' }}
  onChange={setValue}
  render={({ defaultValue }, ref) => (
    <TextField
      inputRef={ref}
      defaultValue={defaultValue}
      value={labelValue}
      label="Range Tanggal"
      fullWidth
      InputLabelProps={{ shrink: true }}
    />
  )}
/>
```

### 2.6 Pencarian, filter, dan pagination

- Pencarian keyword gunakan `TableSearch`.
- Filtering ringan di client gunakan `useMemo` bila datanya sudah ada di halaman.
- Pagination gunakan `Pagination` dari MUI dengan warna `primary`.
- Informasi jumlah data boleh ditaruh di bawah tabel seperti pola di `KomponenDarah`.

### 2.7 Informasi status dan notifikasi ringan

- Gunakan `Chip` untuk status singkat seperti aktif/nonaktif, draft/selesai, atau label kategori.
- Gunakan `Alert` untuk informasi penting, warning, atau penjelasan proses.

## 3. Aturan Pemilihan Komponen

- Tanggal atau range tanggal: `Flatpickr`
- Input pilihan/master data: `InputAutoComplete`
- Input teks biasa: `TextField`
- Select statis sederhana: `TextField select`
- Tabel data: `DataTable` + `TableHead` + `TableSearch`
- Aksi per baris: `ActionCell`
- Card pembungkus halaman: `MainCard`
- Tombol aksi utama: `AnimateButton`
- Status singkat: `Chip`
- Informasi penting di atas form/tabel: `Alert`
- Dialog tambah/edit/detail singkat: `Dialog`

## 4. Struktur Folder Halaman

Struktur folder baru mengikuti pola seperti `input-jadwal`: satu folder induk untuk satu domain/fitur, lalu satu subfolder untuk setiap halaman.

Contoh patokan:

```text
src/pages/absensi/input-jadwal/
  detail-jam-kerja/
    DetailJamKerja.jsx
  jadwal-pegawai/
    JadwalPegawai.jsx
    InputJadwalPegawai.jsx
    HapusLogAbsenPegawai.jsx
  jadwal-manajemen/
    JadwalManajemen.jsx
```

## 5. Aturan Struktur Folder Baru

- Jika satu menu memiliki beberapa halaman, buat folder induk fiturnya terlebih dahulu.
- Setiap halaman dibuatkan folder sendiri dengan format nama folder `kebab-case`.
- File komponen halaman utama memakai format `PascalCase.jsx`.
- Hook lokal halaman diletakkan di folder yang sama dengan halaman tersebut jika hanya dipakai halaman itu.
- Helper kecil atau konstanta lokal yang spesifik ke halaman juga diletakkan di folder halaman yang sama.
- Jangan menaruh banyak halaman saudara langsung dalam satu folder tanpa pemisahan jika fiturnya sudah berkembang.

Contoh struktur yang disarankan:

```text
src/pages/nama-fitur/
  nama-halaman/
    NamaHalaman.jsx
    useNamaHalaman.js
    constants.js
```

Jika hanya ada satu file halaman dan belum ada kebutuhan lain, minimal tetap gunakan pola:

```text
src/pages/nama-fitur/
  nama-halaman/
    NamaHalaman.jsx
```

## 6. Aturan Penamaan

- Nama folder: `kebab-case`
- Nama file komponen React: `PascalCase.jsx`
- Nama hook: `useNamaHook.js`
- Nama konstanta/helper lokal: deskriptif dan sesuai fungsi
- Nama kolom tabel disimpan di konstanta `columns`
- Data awal form disimpan di konstanta seperti `initialFormData` atau `defaultForm`

## 7. Aturan Pola Kode

- Pisahkan data turunan/filtering ke `useMemo` jika berasal dari state atau data fetch.
- Handler gunakan penamaan jelas seperti `handleOpenDialog`, `handleCloseDialog`, `handleSubmit`, `handleDelete`.
- Untuk halaman CRUD, utamakan pola yang sudah dipakai di `master`, `stokopname`, dan `transaksi`.
- Jika logic halaman mulai panjang, pertimbangkan memindahkan logic ke hook lokal seperti pola `useKomponenDarah`.

## 8. Referensi Halaman Utama

- Tabel + dialog CRUD dasar:
  `src/pages/master/komponen-darah/KomponenDarah.jsx`
- Tabel + autocomplete:
  `src/pages/master/Ruangan.jsx`
- Tabel + dialog form transaksi:
  `src/pages/transaksi/DarahKeluar.jsx`
- Tabel + navigasi detail:
  `src/pages/stokopname/StokOpname.jsx`
- Tanggal/range tanggal:
  `src/pages/absensi/input-jadwal/jadwal-pegawai/InputJadwalPegawai.jsx`

## 9. Hal yang Sebaiknya Dihindari

- Jangan menambah library input baru jika komponen yang ada masih cukup.
- Jangan mencampur banyak pola layout dalam satu halaman.
- Jangan membuat struktur folder datar untuk fitur yang memiliki banyak halaman.
- Jangan membuat komponen form atau tabel baru tanpa alasan jelas.

## 10. Checklist Sebelum Membuat UI Baru

- Apakah sudah memakai `MainCard` untuk pembungkus utama?
- Apakah tabel sudah memakai `DataTable`, `TableHead`, dan `TableSearch`?
- Apakah field pilihan sudah memakai `InputAutoComplete` jika cocok?
- Apakah field tanggal sudah memakai `Flatpickr`?
- Apakah aksi utama sudah mengikuti pola `AnimateButton`?
- Apakah folder halaman sudah mengikuti pola `kebab-case` + file `PascalCase.jsx`?
- Apakah referensi visualnya masih konsisten dengan `dashboard`, `master`, `stokopname`, dan `transaksi`?
