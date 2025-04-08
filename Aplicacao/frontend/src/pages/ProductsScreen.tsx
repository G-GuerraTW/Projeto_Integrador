import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductsScreen = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    size: "",
    color: "",
    supplier: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name?: string; value: unknown } }) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name!]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Produto cadastrado:", product);
    alert("Produto cadastrado com sucesso!");
    setProduct({
      name: "",
      category: "",
      price: "",
      size: "",
      color: "",
      supplier: "",
    });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", mt: 4 }}>
      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          Home
        </Link>
        <Typography color="text.primary">Cadastro de Produto</Typography>
      </Breadcrumbs>

      <Typography variant="h4" gutterBottom>
        Cadastro de Produto
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nome do Produto"
          name="name"
          value={product.name}
          onChange={handleChange}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Categoria</InputLabel>
          <Select
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <MenuItem value="Calçado">Calçado</MenuItem>
            <MenuItem value="Roupa">Roupa</MenuItem>
            <MenuItem value="Acessórios">Acessórios</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Preço Unitário"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Tamanho</InputLabel>
          <Select
            name="size"
            value={product.size}
            onChange={handleChange}
          >
            <MenuItem value="P">P</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="G">G</MenuItem>
            <MenuItem value="GG">GG</MenuItem>
            <MenuItem value="XGG">XGG</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Cor"
          name="color"
          value={product.color}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Fornecedor"
          name="supplier"
          value={product.supplier}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#4A148C", color: "white" }}
          fullWidth
        >
          Cadastrar Produto
        </Button>
      </form>
    </Box>
  );
};

export default ProductsScreen;