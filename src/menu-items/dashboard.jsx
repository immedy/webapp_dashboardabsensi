// assets
import { 
  DashboardOutlined,
  MedicineBoxOutlined,
  FileDoneOutlined,
  ExportOutlined,
  ImportOutlined,
  SettingOutlined,
  DatabaseOutlined,
  SwapOutlined
} from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  MedicineBoxOutlined,
  FileDoneOutlined,
  ExportOutlined,
  ImportOutlined,
  SettingOutlined,
  DatabaseOutlined,
  SwapOutlined
};

// ==============================|| MENU ITEMS - BLOOD BANK ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

const masterData = {
  id: 'group-master',
  title: 'Master Data',
  type: 'group',
  children: [
    {
      id: 'komponen-darah',
      title: 'Komponen Darah',
      type: 'item',
      url: '/master/komponen-darah',
      icon: icons.MedicineBoxOutlined,
      breadcrumbs: true
    },
    {
      id: 'supplier',
      title: 'Supplier / PMI',
      type: 'item',
      url: '/master/supplier',
      icon: icons.DatabaseOutlined,
      breadcrumbs: true
    },
    {
      id: 'ruangan',
      title: 'Ruangan',
      type: 'item',
      url: '/master/ruangan',
      icon: icons.SettingOutlined,
      breadcrumbs: true
    }
  ]
};

const transaksi = {
  id: 'group-transaksi',
  title: 'Transaksi',
  type: 'group',
  children: [
    {
      id: 'transaksi-darah',
      title: 'Transaksi Darah',
      type: 'collapse',
      icon: icons.SwapOutlined,
      children: [
        {
          id: 'darah-masuk',
          title: 'Darah Masuk',
          type: 'item',
          url: '/transaksi/darah-masuk',
          icon: icons.ImportOutlined,
          breadcrumbs: true
        },
        {
          id: 'darah-keluar',
          title: 'Darah Keluar',
          type: 'item',
          url: '/transaksi/darah-keluar',
          icon: icons.ExportOutlined,
          breadcrumbs: true
        }
      ]
    }
  ]
};

const stokOpname = {
  id: 'group-stokopname',
  title: 'Stok Opname',
  type: 'group',
  children: [
    {
      id: 'stokopname',
      title: 'Stok Opname',
      type: 'item',
      url: '/stokopname',
      icon: icons.FileDoneOutlined,
      breadcrumbs: true
    }
  ]
};

export { dashboard, masterData, transaksi, stokOpname };
