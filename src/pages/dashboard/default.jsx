import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
import OrdersTable from 'sections/dashboard/default/OrdersTable';

// assets
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [orderMenuAnchor, setOrderMenuAnchor] = useState(null);
  const handleOrderMenuClick = (event) => {
    setOrderMenuAnchor(event.currentTarget);
  };
  const handleOrderMenuClose = () => {
    setOrderMenuAnchor(null);
  };

  const handleAnalyticsMenuClick = (event) => {
    setAnalyticsMenuAnchor(event.currentTarget);
  };
  const handleAnalyticsMenuClose = () => {
    setAnalyticsMenuAnchor(null);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Total Sales" count="35,078" percentage={27.4} isLoss color="warning" extra="20,395" />
      </Grid>
      <Grid sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} size={{ md: 8 }} />
      {/* row 2 */}
      <Grid size={{ xs: 12, md: 7, lg: 12 }}>
        <UniqueVisitorCard />     
      </Grid>
      {/* row 3 */}
      <Grid size={{ xs: 12, md: 7, lg: 12 }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Grid>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid>
            <IconButton onClick={handleOrderMenuClick}>
              <EllipsisOutlined style={{ fontSize: '1.25rem' }} />
            </IconButton>
            <Menu
              id="fade-menu"
              slotProps={{ list: { 'aria-labelledby': 'fade-button' } }}
              anchorEl={orderMenuAnchor}
              onClose={handleOrderMenuClose}
              open={Boolean(orderMenuAnchor)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleOrderMenuClose}>Export as CSV</MenuItem>
              <MenuItem onClick={handleOrderMenuClose}>Export as Excel</MenuItem>
              <MenuItem onClick={handleOrderMenuClose}>Print Table</MenuItem>
            </Menu>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      {/* row 4 */}      
    </Grid>
  );
}
