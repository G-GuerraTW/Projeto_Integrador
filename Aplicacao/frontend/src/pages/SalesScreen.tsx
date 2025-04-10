import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface SalesScreenProps {
  products: Product[];
  onSaleComplete: (updatedProduct: Product, quantity: number) => void;
}

const SalesScreen: React.FC<SalesScreenProps> = ({ products, onSaleComplete }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleConfirmSale = () => {
    const product = products.find((p) => p.id === selectedProduct);
    if (product) {
      const updatedProduct = {
        ...product,
        stock: product.stock - quantity,
      };

      // Atualizar o estoque e registrar a venda
      onSaleComplete(updatedProduct, quantity);
      alert("Venda realizada com sucesso!");
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#F3E5F5", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Realizar Venda
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Produto</InputLabel>
        <Select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name} - R$ {product.price.toFixed(2)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Quantidade"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        fullWidth
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        sx={{ backgroundColor: "#4A148C", color: "white" }}
        onClick={handleConfirmSale}
        disabled={!selectedProduct || quantity <= 0}
      >
        Confirmar Venda
      </Button>
    </Box>
  );
};

export default SalesScreen;