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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Breadcrumbs,
  Link,
  SelectChangeEvent,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

const SalesScreen = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [form, setForm] = useState({
    code: "",
    product: "",
    quantity: 1,
    price: 0,
    subtotal: 0,
  });
  const [sales, setSales] = useState<
    { code: string; product: string; quantity: number; price: number; subtotal: number }[]
  >([]);
  const [stockData] = useState([
    { name: "Roupas", value: 50 },
    { name: "Acessórios", value: 30 },
    { name: "Calçados", value: 20 },
  ]);

  const COLORS = ["#4A148C", "#7B1FA2", "#BA68C8"]; // Tons de roxo para o gráfico

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name!]: value,
      subtotal: name === "quantity" || name === "price" ? prev.quantity * prev.price : prev.subtotal,
    }));
  };

  const handleAddSale = () => {
    setSales([...sales, form]);
    setForm({ code: "", product: "", quantity: 1, price: 0, subtotal: 0 });
  };

  const handleFinalizeSale = () => {
    alert("Venda finalizada com sucesso!");
    setSales([]);
    setClientName("");
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#F3E5F5", minHeight: "100vh" }}>
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
        <Typography color="text.primary">Vendas</Typography>
      </Breadcrumbs>

      {/* Cabeçalho */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          backgroundColor: "#4A148C",
          color: "white",
          p: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6">Operador: João Silva</Typography>
        <Typography variant="h5">Sistema de Vendas</Typography>
        <Typography variant="h6">{new Date().toLocaleString()}</Typography>
      </Box>

      {/* Layout Principal */}
      <Box sx={{ display: "flex", gap: 3 }}>
        {/* Coluna Esquerda */}
        <Box sx={{ flex: 2 }}>
          {/* Campo para Nome do Cliente */}
          <TextField
            fullWidth
            label="Nome do Cliente"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            margin="normal"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />

          {/* Formulário de Venda */}
          <Box
            component="form"
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              mb: 3,
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Código"
              name="code"
              value={form.code}
              onChange={(e) => handleFormChange(e as SelectChangeEvent<string>)}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Produto</InputLabel>
              <Select
                name="product"
                value={form.product}
                onChange={handleFormChange}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              >
                <MenuItem value="Calçado">Calçado</MenuItem>
                <MenuItem value="Roupa">Roupa</MenuItem>
                <MenuItem value="Acessório">Acessório</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Quantidade"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleFormChange}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
            <TextField
              label="Preço"
              name="price"
              type="number"
              value={form.price}
              onChange={handleFormChange}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
            <TextField
              label="Subtotal"
              name="subtotal"
              value={form.subtotal}
              InputProps={{ readOnly: true }}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#4A148C", color: "white" }}
              onClick={handleAddSale}
            >
              Adicionar
            </Button>
          </Box>

          {/* Tabela de Vendas */}
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#4A148C" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Código</TableCell>
                  <TableCell sx={{ color: "white" }}>Produto</TableCell>
                  <TableCell sx={{ color: "white" }}>Quantidade</TableCell>
                  <TableCell sx={{ color: "white" }}>Preço</TableCell>
                  <TableCell sx={{ color: "white" }}>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales.map((sale, index) => (
                  <TableRow key={index}>
                    <TableCell>{sale.code}</TableCell>
                    <TableCell>{sale.product}</TableCell>
                    <TableCell>{sale.quantity}</TableCell>
                    <TableCell>{sale.price}</TableCell>
                    <TableCell>{sale.subtotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Botão de Finalizar Venda */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#4A148C", color: "white", width: "50%" }}
              onClick={handleFinalizeSale}
              disabled={sales.length === 0}
            >
              Finalizar Venda
            </Button>
          </Box>
        </Box>

        {/* Coluna Direita */}
        <Box sx={{ flex: 1 }}>
          <PieChart width={400} height={400}>
            <Pie
              data={stockData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {stockData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>
      </Box>
    </Box>
  );
};

export default SalesScreen;