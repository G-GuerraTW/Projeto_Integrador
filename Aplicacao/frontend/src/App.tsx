import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PdvScreen from './pages/PdvScreen';
import ProductsScreen from './pages/ProductsScreen';
import SalesScreen from './pages/SalesScreen';


function App() {
  return (
    <Routes>
      <Route path="/" element={<PdvScreen />} />
      <Route path="/products" element={<ProductsScreen />} />
      <Route path="/sales" element={<SalesScreen />} />
    </Routes>
  );
}

export default App;
