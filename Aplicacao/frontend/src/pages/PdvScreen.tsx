import { useState, useEffect, useCallback } from "react";
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
  IconButton,
  Tooltip,
  CircularProgress,
  Chip,
  Divider,
  useTheme,
  Fade,
  Alert,
  Snackbar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RefreshIcon from '@mui/icons-material/Refresh';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { styled } from '@mui/material/styles';
// import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';

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
  itens?: SaleItem[];
}

// Interface para itens de venda
interface SaleItem {
  id: number;
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
  nomeProduto?: string;
}
// Componente de card estilizado
const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

// Cores para o gráfico
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

const PdvScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Estados
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Função para mostrar notificação
  const showNotification = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Função para buscar dados da API
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulando chamada à API - em produção, substitua por chamadas reais
      // const productsResponse = await fetch('http://localhost:5193/api/produto');
      // const salesResponse = await fetch('http://localhost:5193/api/venda');
      
      // if (!productsResponse.ok) throw new Error(`Erro ao buscar produtos: ${productsResponse.status}`);
      // if (!salesResponse.ok) throw new Error(`Erro ao buscar vendas: ${salesResponse.status}`);
      
      // const productsData = await productsResponse.json();
      // const salesData = await salesResponse.json();

      // Dados fictícios para simulação
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

      const mockSales: Sale[] = [
        {
          id: 1,
          data: "2023-06-01T14:30:00",
          total: 249.99,
          valorPago: 250.00,
          troco: 0.01,
          formaPagamento: "Dinheiro",
          itens: [
            {
              id: 1,
              produtoId: 1,
              quantidade: 1,
              precoUnitario: 249.99,
              subtotal: 249.99,
              nomeProduto: "Tênis Esportivo"
            }
          ]
        },
        {
          id: 2,
          data: "2023-06-02T10:15:00",
          total: 119.98,
          valorPago: 119.98,
          troco: 0.00,
          formaPagamento: "Cartão",
          itens: [
            {
              id: 2,
              produtoId: 2,
              quantidade: 2,
              precoUnitario: 59.99,
              subtotal: 119.98,
              nomeProduto: "Camiseta Básica"
            }
          ]
        },
        {
          id: 3,
          data: "2023-06-03T16:45:00",
          total: 329.97,
          valorPago: 329.97,
          troco: 0.00,
          formaPagamento: "Pix",
          itens: [
            {
              id: 3,
              produtoId: 4,
              quantidade: 1,
              precoUnitario: 129.99,
              subtotal: 129.99,
              nomeProduto: "Calça Jeans"
            },
            {
              id: 4,
              produtoId: 5,
              quantidade: 1,
              precoUnitario: 179.99,
              subtotal: 179.99,
              nomeProduto: "Relógio Esportivo"
            },
            {
              id: 5,
              produtoId: 3,
              quantidade: 0.5,
              precoUnitario: 39.99,
              subtotal: 19.99,
              nomeProduto: "Boné Ajustável"
            }
          ]
        }
      ];

      setProducts(mockProducts);
      setSales(mockSales);
      showNotification('Dados atualizados com sucesso!', 'success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao buscar dados';
      setError(errorMessage);
      showNotification(`Erro ao carregar dados: ${errorMessage}`, 'error');
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Efeito para carregar dados
  useEffect(() => {
    fetchData();
  }, [refreshKey, fetchData]);

  // Função para atualizar dados
  const refreshData = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  // Função para iniciar nova venda
  const startNewSale = () => {
    navigate("/sales");
  };

  // Calcular estatísticas
  const totalSales = sales.length;
  const totalSalesValue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalProducts = products.length;
  const productsInStock = products.filter(p => p.quantidade > 0).length;
  const lowStockProducts = products.filter(p => p.quantidade <= 5 && p.quantidade > 0).length;
  const outOfStockProducts = products.filter(p => p.quantidade === 0).length;

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
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PointOfSaleIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            PDV System
          </Typography>
        </Box>
        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
        <List>
          <ListItemButton 
            onClick={() => navigate("/")}
            sx={{ 
              '&.Mui-selected': { backgroundColor: 'rgba(255,255,255,0.2)' },
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
            selected={true}
          >
            <DashboardIcon sx={{ mr: 2 }} />
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton 
            onClick={() => navigate("/sales")}
            sx={{ 
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <AddShoppingCartIcon sx={{ mr: 2 }} />
            <ListItemText primary="Nova Venda" />
          </ListItemButton>
          <ListItemButton 
            onClick={() => navigate("/products")}
            sx={{ 
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <InventoryIcon sx={{ mr: 2 }} />
            <ListItemText primary="Produtos" />
          </ListItemButton>
          <ListItemButton 
            onClick={() => navigate("/sales-history")}
            sx={{ 
              '&.Mui-selected': { backgroundColor: 'rgba(255,255,255,0.2)' },
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
            selected={true}
          >
            <ReceiptLongIcon sx={{ mr: 2 }} />
            <ListItemText primary="Histórico de Vendas" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          backgroundColor: "#F3E5F5", 
          overflow: "auto" 
        }}
      >
        {/* Cabeçalho */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate("/")}
                sx={{ cursor: "pointer", display: 'flex', alignItems: 'center' }}
              >
                <DashboardIcon sx={{ mr: 0.5, fontSize: 20 }} />
                Dashboard
              </Link>
            </Breadcrumbs>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
              Dashboard
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Atualizar dados">
              <IconButton onClick={refreshData} color="primary" sx={{ mr: 1 }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>








          </Box>
        </Box>

        {/* Exibir erro se houver */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Indicador de carregamento */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Cards de Estatísticas */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          {/* Card: Total de Vendas */}
          <Box sx={{ flex: '1 1 calc(25% - 16px)', minWidth: '240px' }}>
            <StatsCard>
              <CardContent>
                <Typography variant="subtitle1" color="text.secondary">
                  Total de Vendas
                </Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {loading ? <CircularProgress size={24} /> : totalSales}
                </Typography>
                <Chip 
                  label="Hoje" 
                  size="small" 
                  color="primary" 
                  sx={{ mt: 1, backgroundColor: '#4A148C' }} 
                />
              </CardContent>
            </StatsCard>
          </Box>
          
          {/* Card: Valor Total Vendido */}
          <Box sx={{ flex: '1 1 calc(25% - 16px)', minWidth: '240px' }}>
            <StatsCard>
              <CardContent>
                <Typography variant="subtitle1" color="text.secondary">
                  Valor Total Vendido
                </Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {loading ? <CircularProgress size={24} /> : `R$ ${totalSalesValue.toFixed(2)}`}
                </Typography>
                <Chip 
                  label="Receita" 
                  size="small" 
                  color="success" 
                  sx={{ mt: 1 }} 
                />
              </CardContent>
            </StatsCard>
          </Box>

          {/* Card: Produtos Cadastrados */}
          <Box sx={{ flex: '1 1 calc(25% - 16px)', minWidth: '240px' }}>
            <StatsCard>
              <CardContent>
                <Typography variant="subtitle1" color="text.secondary">
                  Produtos Cadastrados
                </Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {loading ? <CircularProgress size={24} /> : totalProducts}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Chip 
                    label={`${productsInStock} em estoque`} 
                    size="small" 
                    color="primary" 
                    sx={{ backgroundColor: '#4A148C' }} 
                  />
                  {lowStockProducts > 0 && (
                    <Chip 
                      label={`${lowStockProducts} baixo estoque`} 
                      size="small" 
                      color="warning" 
                    />
                  )}
                </Box>
              </CardContent>
            </StatsCard>
          </Box>

          {/* Card: Status do Estoque */}
          <Box sx={{ flex: '1 1 calc(25% - 16px)', minWidth: '240px' }}>
            <StatsCard>
              <CardContent>
                <Typography variant="subtitle1" color="text.secondary">
                  Status do Estoque
                </Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {loading ? <CircularProgress size={24} /> : (
                    outOfStockProducts > 0 ? 
                    <Typography variant="h4" color="error">Atenção</Typography> : 
                    <Typography variant="h4" color="success">OK</Typography>
                  )}
                </Typography>
                {outOfStockProducts > 0 && (
                  <Chip 
                    label={`${outOfStockProducts} produtos sem estoque`} 
                    size="small" 
                    color="error" 
                    sx={{ mt: 1 }} 
                  />
                )}
              </CardContent>
            </StatsCard>
          </Box>
        </Box>

        {/* Botão de Venda Rápida */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddShoppingCartIcon />}
            onClick={startNewSale}
            sx={{
              backgroundColor: "#4A148C",
              color: "white",
              fontSize: "1.2rem",
              padding: "0.8rem 4rem",
              borderRadius: "8px",
              boxShadow: 3,
              '&:hover': {
                backgroundColor: "#7B1FA2",
                boxShadow: 6,
              }
            }}
          >
            Iniciar Nova Venda
          </Button>
        </Box>

        {/* Tabela de Últimas Vendas */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Últimas Vendas
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/sales-history")}
              sx={{ borderColor: '#4A148C', color: '#4A148C' }}
            >
              Ver Todas
            </Button>
          </Box>
          <Fade in={!loading}>
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '8px' }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#4A148C" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Nº</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Data</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Valor Total</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Valor Pago</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Troco</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Pagamento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sales.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        Nenhuma venda registrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    sales.map((sale) => (
                      <TableRow 
                        key={sale.id}
                        sx={{ 
                          '&:hover': { 
                            backgroundColor: '#F3E5F5',
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => navigate(`/sales/${sale.id}`)}
                      >
                        <TableCell>{sale.id}</TableCell>
                        <TableCell>{new Date(sale.data).toLocaleString()}</TableCell>
                        <TableCell>R$ {sale.total.toFixed(2)}</TableCell>
                        <TableCell>R$ {sale.valorPago.toFixed(2)}</TableCell>
                        <TableCell>R$ {sale.troco.toFixed(2)}</TableCell>
                        <TableCell>
                          <Chip 
                            label={sale.formaPagamento} 
                            size="small"
                            color={
                              sale.formaPagamento === "Dinheiro" ? "success" :
                              sale.formaPagamento === "Cartão" ? "primary" :
                              "secondary"
                            }
                            sx={
                              sale.formaPagamento === "Cartão" ? { backgroundColor: '#4A148C' } : {}
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>
        </Box>

        {/* Produtos com Baixo Estoque */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Produtos com Baixo Estoque
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/products")}
              sx={{ borderColor: '#4A148C', color: '#4A148C' }}
            >
              Gerenciar Estoque
            </Button>
          </Box>
          <Fade in={!loading}>
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '8px' }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#4A148C" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Nome</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Categoria</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Quantidade</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Preço</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.filter(p => p.quantidade <= 5).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        Todos os produtos têm estoque adequado
                      </TableCell>
                    </TableRow>
                  ) : (
                    products
                      .filter(p => p.quantidade <= 5)
                      .map((product) => (
                        <TableRow 
                          key={product.id}
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: '#F3E5F5',
                              cursor: 'pointer'
                            }
                          }}
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          <TableCell>{product.id}</TableCell>
                          <TableCell>{product.nome}</TableCell>
                          <TableCell>{product.categoria}</TableCell>
                          <TableCell>{product.quantidade}</TableCell>
                          <TableCell>R$ {product.precoVenda.toFixed(2)}</TableCell>
                          <TableCell>
                            <Chip 
                              label={product.quantidade === 0 ? "Sem Estoque" : "Baixo Estoque"} 
                              size="small"
                              color={product.quantidade === 0 ? "error" : "warning"}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>
        </Box>

        {/* Snackbar para notificações */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setOpenSnackbar(false)} 
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default PdvScreen;