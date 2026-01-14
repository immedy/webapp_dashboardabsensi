import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function AuthGuard({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // tampilkan spinner saat loading
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // redirect ke login jika belum login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
