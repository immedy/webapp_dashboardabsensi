import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from 'components/Loadable';

const LoginPage = Loadable(lazy(() => import('pages/auth/Login')));

const LoginRoutes = {
  path: '/',
  children: [
    {
      index: true,
      element: <Navigate to="/login" replace />
    },
    {
      path: 'login',
      element: <LoginPage />
    }
  ]
};

export default LoginRoutes;
