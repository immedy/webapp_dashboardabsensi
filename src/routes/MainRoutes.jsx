import { lazy } from 'react';
import AuthGuard from '../utils/route-guard/AuthGuard';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render - Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - Master Data
const KomponenDarah = Loadable(lazy(() => import('pages/master/KomponenDarah')));
const Supplier = Loadable(lazy(() => import('pages/master/Supplier')));
const Ruangan = Loadable(lazy(() => import('pages/master/Ruangan')));

// render - Transaksi
const DarahMasuk = Loadable(lazy(() => import('pages/transaksi/DarahMasuk')));
const DarahKeluar = Loadable(lazy(() => import('pages/transaksi/DarahKeluar')));

// render - Stok Opname
const StokOpname = Loadable(lazy(() => import('pages/stokopname/StokOpname')));
const StokOpnameDetail = Loadable(lazy(() => import('pages/stokopname/StokOpnameDetail')));

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
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'komponen-darah',
          element: <KomponenDarah />
        },
        {
          path: 'supplier',
          element: <Supplier />
        },
        {
          path: 'ruangan',
          element: <Ruangan />
        }
      ]
    },
    {
      path: 'transaksi',
      children: [
        {
          path: 'darah-masuk',
          element: <DarahMasuk />
        },
        {
          path: 'darah-keluar',
          element: <DarahKeluar />
        }
      ]
    },
    {
      path: 'stokopname',
      children: [
        {
          path: '',
          element: <StokOpname />
        },
        {
          path: 'detail/:id',
          element: <StokOpnameDetail />
        }
      ]
    }
  ]
};

export default MainRoutes;
