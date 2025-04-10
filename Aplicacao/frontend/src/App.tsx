import React from "react";
import { Routes, Route } from "react-router-dom";
import PdvScreen from "./pages/PdvScreen";
import ProductsScreen from "./pages/ProductsScreen";
import SalesScreen from "./pages/SalesScreen";
import ClientScreen from "./pages/ClientScreen";
import SupplierScreen from "./pages/SupplierScreen";
import ReportsScreen from "./pages/ReportsScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PdvScreen />} />
      <Route path="/products" element={<ProductsScreen />} />
      <Route
        path="/sales"
        element={<SalesScreen products={[]} onSaleComplete={() => {}} />}
      />
      <Route path="/clients" element={<ClientScreen />} />
      <Route path="/suppliers" element={<SupplierScreen />} />
      <Route path="/reports" element={<ReportsScreen />} />
    </Routes>
  );
}

export default App;
