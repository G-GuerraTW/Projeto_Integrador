import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import PdvScreen from '../pages/PdvScreen';
import ProductsScreen from '../pages/ProductsScreen';
import SalesScreen from '../pages/SalesScreen';
import ErrorScreen from '../pages/ErrorScreen';
import LoginScreen from '../pages/LoginScreen';
import ProtectedRoute from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <ErrorScreen />,
    children: [
      {
        element: <App />,
        children: [
          { index: true, element: <Navigate to="/pdv" replace /> },
          { path: 'pdv', element: <PdvScreen /> },
          { path: 'products', element: <ProductsScreen /> },
          { path: 'sales', element: <SalesScreen /> },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginScreen />,
  },
]);