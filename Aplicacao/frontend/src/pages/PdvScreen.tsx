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
  ListItemButton,
  ListItemText,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Button,
  Grid
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Interface que corresponderá ao modelo do backend
export interface Product {
  id: number;
  nome: string;
  categoria: string;
  tamanho: string;
  cor: string;
  quantidade: number;
  precoCusto: number;
  precoVenda: number;
  criadoEm: string;
}

// Interface para vendas
interface Sale {
  id: number;
  data: string;
  total: number;
  valorPago: number;
  troco: number;
  formaPagamento: string;
}

const PdvScreen = () => {
  // Estados
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const navigate = useNavigate();

  // Efeito para carregar dados fictícios
  useEffect(() => {
    // Dados fictícios de produtos
    const mockProducts: Product[] = [
      {
        id: 1,
        nome: "Tênis Esportivo",
        categoria: "Calçados",
        tamanho: "42",
        cor: "Preto",
        quantidade: 15,
        precoCusto: 120.00,
        precoVenda: 249.99,
        criadoEm: "2023-05-10T14:30:00"
      },
      {
        id: 2,
        nome: "Camiseta Básica",
        categoria: "Roupas",
        tamanho: "M",
        cor: "Branco",
        quantidade: 30,
        precoCusto: 25.00,
        precoVenda: 59.99,
        criadoEm: "2023-05-12T10:15:00"
      },
      {
        id: 3,
        nome: "Boné Ajustável",
        categoria: "Acessórios",
        tamanho: "Único",
        cor: "Azul",
        quantidade: 20,
        precoCusto: 15.00,
        precoVenda: 39.99,
        criadoEm: "2023-05-15T16:45:00"
      },
      {
        id: 4,
        nome: "Calça Jeans",
        categoria: "Roupas",
        tamanho: "40",
        cor: "Azul",
        quantidade: 12,
        precoCusto: 60.00,
        precoVenda: 129.99,
        criadoEm: "2023-05-18T09:20:00"
      },
      {
        id: 5,
        nome: "Relógio Esportivo",
        categoria: "Acessórios",
        tamanho: "Único",
        cor: "Prata",
        quantidade: 8,
        precoCusto: 80.00,
        precoVenda: 179.99,
        criadoEm: "2023-05-20T11:30:00"
      }
    ];

    // Dados fictícios de vendas
    const mockSales: Sale[] = [
      {
        id: 1,
        data: "2023-06-01T14:30:00",
        total: 249.99,
        valorPago: 250.00,
        troco: 0.01,
        formaPagamento: "Dinheiro"
      },
      {
        id: 2,
        data: "2023-06-02T10:15:00",
        total: 119.98,
        valorPago: 119.98,
        troco: 0.00,
        formaPagamento: "Cartão"
      },
      {
        id: 3,
        data: "2023-06-03T16:45:00",
        total: 329.97,
        valorPago: 329.97,
        troco: 0.00,
        formaPagamento: "Pix"
      }
    ];

    setProducts(mockProducts);
    setSales(mockSales);

    // Quando implementar o backend, substitua por:
    /*
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5193/api/produto');
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    const fetchSales = async () => {
      try {
        const response = await fetch('http://localhost:5193/api/venda');
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      }
    };

    fetchProducts();
    fetchSales();
    */
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
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemText primary="PDV" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/products")}>
            <ListItemText primary="Cadastro de Produtos" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/sales")}>
            <ListItemText primary="Vendas" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#F3E5F5", overflow: "auto" }}
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
              padding: "1rem 5rem",
            }}
            onClick={() => navigate("/sales")}
          >
            Vender
          </Button>
        </Box>

        {/* Cards de Resumo */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
          {/* Card: Total de Vendas */}
          <Box sx={{ flex: "1 1 calc(25% - 16px)", minWidth: "240px" }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Total de Vendas</Typography>
                <Typography variant="h4">{sales.length}</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Card: Valor Total Vendido */}
          <Box sx={{ flex: "1 1 calc(25% - 16px)", minWidth: "240px" }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Valor Total Vendido</Typography>
                <Typography variant="h4">
                  R$ {sales.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Card: Produtos Cadastrados */}
          <Box sx={{ flex: "1 1 calc(25% - 16px)", minWidth: "240px" }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Produtos Cadastrados</Typography>
                <Typography variant="h4">{products.length}</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Card: Produtos em Estoque */}
          <Box sx={{ flex: "1 1 calc(25% - 16px)", minWidth: "240px" }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Produtos em Estoque</Typography>
                <Typography variant="h4">
                  {products.filter((product) => product.quantidade > 0).length}
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
                <TableCell sx={{ color: "white" }}>Data</TableCell>
                <TableCell sx={{ color: "white" }}>Valor Total</TableCell>
                <TableCell sx={{ color: "white" }}>Valor Pago</TableCell>
                <TableCell sx={{ color: "white" }}>Troco</TableCell>
                <TableCell sx={{ color: "white" }}>Forma de Pagamento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>{new Date(sale.data).toLocaleString()}</TableCell>
                  <TableCell>R$ {sale.total.toFixed(2)}</TableCell>
                  <TableCell>R$ {sale.valorPago.toFixed(2)}</TableCell>
                  <TableCell>R$ {sale.troco.toFixed(2)}</TableCell>
                  <TableCell>{sale.formaPagamento}</TableCell>
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