import { useState } from 'react';
import { useDataFetch, useFormSubmit, useDelete } from 'hooks/useBloodBank';
import { komponenDarahService } from 'services/komponenDarah.service';

/**
 * Nilai awal form.
 * Simpan di konstanta agar mudah di-reset dari banyak tempat.
 */
const INITIAL_FORM_DATA = {
  id: null,
  kode: '',
  deskripsi: '',
  keterangan: '',
  masa_simpan: ''
};

/**
 * Custom hook untuk fitur CRUD "Komponen Darah".
 *
 * Pola yang dipakai di hook ini bisa kamu tiru saat bikin hook lain:
 * 1. Definisikan state UI lokal (dialog, mode edit, form).
 * 2. Ambil data list dari server lewat hook fetch.
 * 3. Bungkus operasi submit & delete dalam handler yang reusable.
 * 4. Return state + handler sebagai "API" hook untuk dipakai komponen UI.
 *
 * @returns {{
 * openDialog: boolean,
 * editMode: boolean,
 * search: string,
 * page: number,
 * pagination: {currentPage: number, lastPage: number, perPage: number, total: number},
 * formData: {id: number|null, kode: string, deskripsi: string, keterangan: string, masa_simpan: string|number},
 * komponenList: Array,
 * loading: boolean,
 * submitting: boolean,
 * deleting: boolean,
 * handleOpenDialog: (item?: object|null) => void,
 * handleCloseDialog: () => void,
 * handleChangeForm: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void,
 * handleSubmit: () => Promise<void>,
 * handleDelete: (id: number|string, deskripsi: string) => Promise<void>,
 * handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
 * handlePageChange: (_: React.ChangeEvent<unknown>, page: number) => void
 * }}
 */
export default function useKomponenDarah() {
  // State UI lokal: kontrol dialog + mode (tambah / edit) + isi form.
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // Ambil list data awal. `refetch` dipanggil lagi setelah create/update/delete sukses.
  const { data, loading, refetch } = useDataFetch(() => komponenDarahService.getKomponenDarah({ page, search }), [page, search, refreshKey]);
  const komponenList = data?.items ?? [];
  const pagination = data?.pagination ?? {
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0
  };

  // Tutup dialog + reset form supaya form selalu bersih saat dibuka ulang.
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(INITIAL_FORM_DATA);
  };

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  // Submit handler:
  // - jika editMode true => update data by id
  // - jika false => create data baru
  // Setelah sukses: tutup dialog dan refresh list.
  const { submit: submitForm, loading: submitting } = useFormSubmit(
    (data) => (editMode ? komponenDarahService.updateKomponenDarah(formData.id, data) : komponenDarahService.createKomponenDarah(data)),
    () => {
      handleCloseDialog();
      if (editMode) {
        triggerRefresh();
      } else {
        if (page === 1) {
          triggerRefresh();
        } else {
          setPage(1);
        }
      }
    }
  );

  // Delete handler terpusat, lalu refresh list setelah delete sukses.
  const { deleteItem, loading: deleting } = useDelete(komponenDarahService.deleteKomponenDarah, refetch);

  // Buka dialog dalam mode edit (jika item ada) atau mode tambah (jika item null).
  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditMode(true);
      setFormData(item);
    } else {
      setEditMode(false);
      setFormData(INITIAL_FORM_DATA);
    }
    setOpenDialog(true);
  };

  // Factory handler untuk field form:
  // pemakaian: onChange={handleChangeForm('deskripsi')}
  const handleChangeForm = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  // Wrapper submit agar komponen UI cukup panggil satu fungsi ini.
  const handleSubmit = async () => {
    await submitForm(formData, editMode ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
  };

  // Wrapper delete dengan label kontekstual untuk notifikasi.
  const handleDelete = async (id, deskripsi) => {
    await deleteItem(id, `komponen ${deskripsi}`);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  // API hook: semua yang dibutuhkan komponen dikembalikan dari sini.
  return {
    openDialog,
    editMode,
    formData,
    search,
    page,
    pagination,
    komponenList,
    loading,
    submitting,
    deleting,
    handleOpenDialog,
    handleCloseDialog,
    handleChangeForm,
    handleSubmit,
    handleDelete,
    handleSearchChange,
    handlePageChange
  };
}
