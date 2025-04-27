import React from 'react'
import Layout from '../components/Layout';
import { Login } from '../features/auth/Login';
import { Register } from '../features/auth/Register';
import { useRoutes } from 'react-router-dom';
import { Menu } from '../pages/menu';
import { ImageCard } from '../features/AdsDetails/ImageCard';
import { HomePage } from '../pages/HomePage';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';


const AppRoutes = () => {
    const routes = [
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/login', element: <PublicRoute><Login /></PublicRoute> },
          { path: '/register', element: <PublicRoute><Register /></PublicRoute> },
          { path: '/myaccount', element:<ProtectedRoute><Menu /></ProtectedRoute> },
          { path: '/profile', element: <ProtectedRoute><Menu /></ProtectedRoute>  },
          { path: '/myads', element: <ProtectedRoute><Menu /></ProtectedRoute>  },
          { path: '/postads', element: <ProtectedRoute><Menu /></ProtectedRoute>  },
          { path: '/advertisementdetails/:id', element: <ImageCard /> },
          {path: '/homePage', element: <HomePage />}
        ],
      },
    ];

    return useRoutes(routes);
  };

  export default AppRoutes;

