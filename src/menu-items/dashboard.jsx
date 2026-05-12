// assets
import { DashboardOutlined, FileDoneOutlined, ImportOutlined, DatabaseOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  FileDoneOutlined,
  ImportOutlined,
  DatabaseOutlined
};

const absensiMenu = {
  id: 'group-absensi',
  title: 'Menu Utama',
  type: 'group',
  children: [
    {
      id: 'dashboard-absensi',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'input-jadwal',
      title: 'Input Jadwal',
      type: 'collapse',
      icon: icons.DatabaseOutlined,
      children: [
        {
          id: 'detail-jam-kerja',
          title: 'Detail Jam Kerja',
          type: 'item',
          url: '/jadwal/detail-jam-kerja',
          breadcrumbs: true
        },
        {
          id: 'jadwal-pegawai',
          title: 'Jadwal Pegawai',
          type: 'item',
          url: '/jadwal/jadwal-pegawai',
          breadcrumbs: true
        },
        {
          id: 'jadwal-manajemen',
          title: 'Jadwal Manajemen',
          type: 'item',
          url: '/jadwal/jadwal-manajemen',
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'laporan',
      title: 'Laporan',
      type: 'item',
      url: '/laporan',
      icon: icons.FileDoneOutlined,
      breadcrumbs: true
    },
    {
      id: 'input-telat',
      title: 'Input Telat',
      type: 'item',
      url: '/input-telat',
      icon: icons.ImportOutlined,
      breadcrumbs: true
    }
  ]
};

export { absensiMenu };
