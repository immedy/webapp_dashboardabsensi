import { lazy } from 'react';
import AuthGuard from '../utils/route-guard/AuthGuard';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render - Absensi
const DashboardAbsensi = Loadable(lazy(() => import('pages/absensi/dashboard/Dashboard')));
const DetailJamKerja = Loadable(lazy(() => import('pages/absensi/input-jadwal/detail-jam-kerja/DetailJamKerja')));
const JadwalPegawai = Loadable(lazy(() => import('pages/absensi/input-jadwal/jadwal-pegawai/JadwalPegawai')));
const InputJadwalPegawai = Loadable(lazy(() => import('pages/absensi/input-jadwal/jadwal-pegawai/InputJadwalPegawai')));
const HapusLogAbsenPegawai = Loadable(lazy(() => import('pages/absensi/input-jadwal/jadwal-pegawai/HapusLogAbsenPegawai')));
const JadwalManajemen = Loadable(lazy(() => import('pages/absensi/input-jadwal/jadwal-manajemen/JadwalManajemen')));
const Laporan = Loadable(lazy(() => import('pages/absensi/laporan/Laporan')));
const InputTelat = Loadable(lazy(() => import('pages/absensi/input-telat/InputTelat')));
const InputLogPegawai = Loadable(lazy(() => import('pages/absensi/input-telat/log-pegawai/InputLogPegawai')));
const JadwalPegawaiTelat = Loadable(lazy(() => import('pages/absensi/input-telat/jadwal-pegawai/JadwalPegawaiTelat')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <DashboardLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/',
      element: <DashboardAbsensi />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '',
          element: <DashboardAbsensi />
        }
      ]
    },
    {
      path: 'jadwal',
      children: [
        {
          path: 'detail-jam-kerja',
          element: <DetailJamKerja />
        },
        {
          path: 'jadwal-pegawai',
          element: <JadwalPegawai />
        },
        {
          path: 'jadwal-pegawai/:id',
          element: <InputJadwalPegawai />
        },
        {
          path: 'jadwal-pegawai/:id/hapus-log',
          element: <HapusLogAbsenPegawai />
        },
        {
          path: 'jadwal-manajemen',
          element: <JadwalManajemen />
        }
      ]
    },
    {
      path: 'laporan',
      element: <Laporan />
    },
    {
      path: 'input-telat',
      children: [
        {
          path: '',
          element: <InputTelat />
        },
        {
          path: ':id',
          element: <InputLogPegawai />
        },
        {
          path: ':id/jadwal',
          element: <JadwalPegawaiTelat />
        }
      ]
    }
  ]
};

export default MainRoutes;
