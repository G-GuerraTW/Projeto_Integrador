import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PdvScreen from '../pages/PdvScreen';
import ProductsScreen from '../pages/ProductsScreen';
import SalesScreen from '../pages/SalesScreen';
import ErrorScreen from '../pages/ErrorScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorScreen />,
    children: [
      { index: true, element: <PdvScreen /> },
      { path: 'pdv', element: <PdvScreen /> },
      { path: 'products', element: <ProductsScreen /> },
      { path: 'sales', element: <SalesScreen /> },
    ],
  },
]);