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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  size: number | undefined;
  color: string;
  supplier: string;
  stock: number;
}

const ProductsScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    category: "",
    price: 0,
    size: undefined,
    color: "",
    supplier: "",
    stock: 0,
  });
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const navigate = useNavigate();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | {
          target: { name?: string; value: unknown };
        }
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name!]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar se o produto é da categoria "Calçado" e se o tamanho foi informado
    if (product.category === "Calçado" && !product.size) {
      alert("Por favor, informe o tamanho para calçados.");
      return;
    }

    // Verificar se a categoria foi selecionada
    if (!product.category) {
      alert("Por favor, selecione uma categoria.");
      return;
    }

    // Verificar se é uma edição ou um novo produto
    if (product.id !== 0) {
      // Atualizar o produto existente
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
      alert("Produto atualizado com sucesso!");
    } else {
      // Adicionar um novo produto
      setProducts((prev) => [
        ...prev,
        { ...product, id: Date.now() }, // Usar timestamp para gerar ID único
      ]);
      alert("Produto cadastrado com sucesso!");
    }

    // Resetar o formulário e fechar o modal
    setProduct({
      id: 0,
      name: "",
      category: "",
      price: 0,
      size: undefined,
      color: "",
      supplier: "",
      stock: 0,
    });
    setOpenModal(false);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    alert("Produto excluído com sucesso!");
  };

  const handleEdit = (id: number) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      setProduct(productToEdit);
      setOpenModal(true);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchCategory === "" || product.category === searchCategory)
  );

  const calculateStockByCategory = (category: string) => {
    return products
      .filter((product) => product.category === category)
      .reduce((total, product) => total + Number(product.stock), 0);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", mt: 4 }}>
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
        <Typography color="text.primary">
          Cadastro e Listagem de Produtos
        </Typography>
      </Breadcrumbs>

      <Typography variant="h4" gutterBottom>
        Cadastro e Listagem de Produtos
      </Typography>

      {/* Botão Novo Produto */}
      <Button
        variant="contained"
        sx={{ mb: 3, backgroundColor: "#4A148C", color: "white" }}
        onClick={() => setOpenModal(true)}
      >
        Novo Produto
      </Button>

      {/* Campos de Busca */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Buscar por Nome"
          variant="outlined"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Filtrar por Categoria</InputLabel>
          <Select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <MenuItem value="">Todas</MenuItem>
            <MenuItem value="Calçado">Calçado</MenuItem>
            <MenuItem value="Roupa">Roupa</MenuItem>
            <MenuItem value="Acessórios">Acessórios</MenuItem>
          </Select>
        </FormControl>
      </Box>
        {/* Cards de Estoque por Categoria */}
        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          <Box sx={{ flex: "1 1 30%", minWidth: "250px" }}>
            <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#EDE7F6" }}>
              <Typography variant="h6">Estoque de Calçados</Typography>
              <Typography variant="h4">
                {calculateStockByCategory("Calçado")}
              </Typography>
            </Paper>
          </Box>
          <Box sx={{ flex: "1 1 30%", minWidth: "250px" }}>
            <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#E3F2FD" }}>
              <Typography variant="h6">Estoque de Roupas</Typography>
              <Typography variant="h4">
                {calculateStockByCategory("Roupa")}
              </Typography>
            </Paper>
          </Box>
          <Box sx={{ flex: "1 1 30%", minWidth: "250px" }}>
            <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#FFF3E0" }}>
              <Typography variant="h6">Estoque de Acessórios</Typography>
              <Typography variant="h4">
                {calculateStockByCategory("Acessórios")}
              </Typography>
            </Paper>
          </Box>
        </Box>

      {/* Tabela de Produtos */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#4A148C" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Nome do Produto</TableCell>
              <TableCell sx={{ color: "white" }}>Fornecedor</TableCell>
              <TableCell sx={{ color: "white" }}>Categoria</TableCell>
              <TableCell sx={{ color: "white" }}>
                Quantidade em Estoque
              </TableCell>
              <TableCell sx={{ color: "white" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.supplier}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(product.id)}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(product.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de Cadastro/Editar Produto */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth>
        <DialogTitle>
          {product.id ? "Editar Produto" : "Novo Produto"}
        </DialogTitle>
        <DialogContent>
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
            {product.category === "Calçado" && (
              <TextField
                fullWidth
                label="Tamanho (somente para calçados)"
                name="size"
                type="number"
                value={product.size || ""}
                onChange={handleChange}
                margin="normal"
              />
            )}
            <TextField
              fullWidth
              label="Preço Unitário"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              margin="normal"
            />
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
            <TextField
              fullWidth
              label="Quantidade em Estoque"
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              margin="normal"
            />
            <DialogActions>
              <Button
                onClick={() => setOpenModal(false)}
                color="secondary"
                variant="outlined"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#4A148C", color: "white" }}
              >
                Salvar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductsScreen;