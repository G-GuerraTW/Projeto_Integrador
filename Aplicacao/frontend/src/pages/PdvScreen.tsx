import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/pdvApi";

export interface Product {
  id: number;
  name: string;
  price: number;
  active: boolean;
}

const PdvScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<any[]>([]); // Mock de vendas realizadas
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((fetchedProducts) =>
        setProducts(
          fetchedProducts.map((product) => ({ ...product, active: true }))
        )
      )
      .catch(console.error);

    // Mock de vendas realizadas
    setSales([
      {
        id: 1,
        total: 150.0,
        paid: 200.0,
        change: 50.0,
        paymentMethod: "Dinheiro",
      },
      {
        id: 2,
        total: 300.0,
        paid: 300.0,
        change: 0.0,
        paymentMethod: "Cartão",
      },
      {
        id: 3,
        total: 120.0,
        paid: 120.0,
        change: 0.0,
        paymentMethod: "Pix",
      },
    ]);
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Menu Lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#4A148C",
            color: "white",
          },
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", py: 2 }}>
          Menu
        </Typography>
        <List>
          <ListItem component="button" onClick={() => navigate("/")}>
            <ListItemText primary="PDV" />
          </ListItem>
          <ListItem component="button" onClick={() => navigate("/products")}>
            <ListItemText primary="Cadastro de Produtos" />
          </ListItem>
        </List>
      </Drawer>

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#F3E5F5" }}
      >
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
          <Typography color="text.primary">PDV</Typography>
        </Breadcrumbs>

        <Typography variant="h4" gutterBottom>
          Ponto de Venda
        </Typography>

        {/* Botão Vender */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4A148C",
              color: "white",
              fontSize: "1.5rem",
              padding: "1rem 2rem",
            }}
            onClick={() => navigate("/sales")}
          >
            Vender
          </Button>
        </Box>

        {/* Cards de Resumo */}
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 3 }}>
          {/* Card: Total de Vendas */}
          <Box sx={{ flex: "1 1 22%", minWidth: "250px" }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total de Vendas</Typography>
                <Typography variant="h4">{sales.length}</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Card: Valor Total Vendido */}
          <Box sx={{ flex: "1 1 22%", minWidth: "250px" }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Valor Total Vendido</Typography>
                <Typography variant="h4">
                  R${" "}
                  {sales.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Card: Produtos Cadastrados */}
          <Box sx={{ flex: "1 1 22%", minWidth: "250px" }}>
            <Paper
              sx={{ p: 2, textAlign: "center", backgroundColor: "#EDE7F6" }}
            >
              <Typography variant="h6">Produtos Cadastrados</Typography>
              <Typography variant="h4">{products.length}</Typography>
            </Paper>
          </Box>

          {/* Card: Produtos Ativos */}
          <Box sx={{ flex: "1 1 22%", minWidth: "250px" }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Produtos Ativos</Typography>
                <Typography variant="h4">
                  {products.filter((product) => product.active).length}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Lista de Últimas Vendas */}
        <Typography variant="h5" gutterBottom>
          Últimas Vendas
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#4A148C" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Número da Venda</TableCell>
                <TableCell sx={{ color: "white" }}>Valor Total</TableCell>
                <TableCell sx={{ color: "white" }}>Valor Pago</TableCell>
                <TableCell sx={{ color: "white" }}>Troco</TableCell>
                <TableCell sx={{ color: "white" }}>
                  Forma de Pagamento
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>R$ {sale.total.toFixed(2)}</TableCell>
                  <TableCell>R$ {sale.paid.toFixed(2)}</TableCell>
                  <TableCell>R$ {sale.change.toFixed(2)}</TableCell>
                  <TableCell>{sale.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default PdvScreen;