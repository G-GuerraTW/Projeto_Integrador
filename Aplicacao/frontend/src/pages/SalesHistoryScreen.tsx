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
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Chip,
  Divider,
  useTheme,
  TextField,
  MenuItem,
  InputAdornment,
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


import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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

// Opções de formas de pagamento para o filtro
const paymentOptions = [
  { value: "", label: "Todas" },
  { value: "Dinheiro", label: "Dinheiro" },
  { value: "Cartão", label: "Cartão" },
  { value: "Pix", label: "Pix" }
];

const SalesHistoryScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Estados
  const [sales, setSales] = useState<Sale[]>([]);
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');


  // Estados para filtros


  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [saleNumber, setSaleNumber] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');



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
      // const salesResponse = await fetch('http://localhost:5193/api/venda');
      
      // if (!salesResponse.ok) throw new Error(`Erro ao buscar vendas: ${salesResponse.status}`);
      
      // const salesData = await salesResponse.json();

      // Dados fictícios para simulação
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
        },
        {
          id: 4,
          data: "2023-06-10T09:30:00",
          total: 179.99,
          valorPago: 200.00,
          troco: 20.01,
          formaPagamento: "Dinheiro",
          itens: [
            {
              id: 6,
              produtoId: 5,
              quantidade: 1,
              precoUnitario: 179.99,
              subtotal: 179.99,
              nomeProduto: "Relógio Esportivo"
            }
          ]
        },
        {
          id: 5,
          data: "2023-06-15T13:45:00",
          total: 299.97,
          valorPago: 299.97,
          troco: 0.00,
          formaPagamento: "Cartão",
          itens: [
            {
              id: 7,
              produtoId: 1,
              quantidade: 1,
              precoUnitario: 249.99,
              subtotal: 249.99,
              nomeProduto: "Tênis Esportivo"
            },
            {
              id: 8,
              produtoId: 3,
              quantidade: 1,
              precoUnitario: 39.99,
              subtotal: 39.99,
              nomeProduto: "Boné Ajustável"
            }
          ]
        },
        {
          id: 6,
          data: "2023-06-20T16:20:00",
          total: 189.98,
          valorPago: 189.98,
          troco: 0.00,
          formaPagamento: "Pix",
          itens: [
            {
              id: 9,
              produtoId: 2,
              quantidade: 2,
              precoUnitario: 59.99,
              subtotal: 119.98,
              nomeProduto: "Camiseta Básica"
            },
            {
              id: 10,
              produtoId: 3,
              quantidade: 1,
              precoUnitario: 39.99,
              subtotal: 39.99,
              nomeProduto: "Boné Ajustável"
            }
          ]
        },
        {
          id: 7,
          data: "2023-06-25T11:10:00",
          total: 129.99,
          valorPago: 130.00,
          troco: 0.01,
          formaPagamento: "Dinheiro",
          itens: [
            {
              id: 11,
              produtoId: 4,
              quantidade: 1,
              precoUnitario: 129.99,
              subtotal: 129.99,
              nomeProduto: "Calça Jeans"
            }
          ]
        }
      ];

      setSales(mockSales);
      setFilteredSales(mockSales);

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

  // Função para aplicar filtros
  const applyFilters = () => {
    let filtered = [...sales];
    
    // Filtrar por número de venda
    if (saleNumber) {
      filtered = filtered.filter(sale => 
        sale.id.toString().includes(saleNumber)
      );
    }
    
    // Filtrar por forma de pagamento
    if (paymentMethod) {
      filtered = filtered.filter(sale => 
        sale.formaPagamento === paymentMethod
      );
    }
    
    // Filtrar por data de início
    if (startDate) {




      const start = new Date(startDate);
      filtered = filtered.filter(sale => 
        new Date(sale.data) >= start
      );
    }
    
    // Filtrar por data de fim
    if (endDate) {












      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(sale => 

        new Date(sale.data) <= end
      );
    }
    
    setFilteredSales(filtered);

  };

  // Função para limpar filtros
  const clearFilters = () => {


    setSaleNumber('');
    setPaymentMethod('');
    setStartDate('');
    setEndDate('');
    setFilteredSales(sales);

  };









  // Calcular estatísticas

  const totalSales = filteredSales.length;
  const totalSalesValue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);








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
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
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
              <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                <ReceiptLongIcon sx={{ mr: 0.5, fontSize: 20 }} />
                Histórico de Vendas
              </Typography>
            </Breadcrumbs>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
              Histórico de Vendas
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Atualizar dados">
              <IconButton onClick={refreshData} color="primary" sx={{ mr: 1 }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => navigate("/sales")}
              sx={{ backgroundColor: "#4A148C" }}
            >
              Nova Venda
            </Button>
          </Box>
        </Box>

        {/* Exibir erro se houver */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Filtros */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: '8px' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Filtros</Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Primeira linha de filtros */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {/* Filtro por número de venda */}
              <Box sx={{ flex: '1 1 200px', minWidth: '150px' }}>
                <TextField
                  fullWidth
                  label="Número da Venda"
                  variant="outlined"
                  size="small"
                  value={saleNumber}
                  onChange={(e) => setSaleNumber(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              
              {/* Filtro por forma de pagamento */}
              <Box sx={{ flex: '1 1 200px', minWidth: '150px' }}>
                <TextField
                  select
                  fullWidth
                  label="Forma de Pagamento"
                  variant="outlined"
                  size="small"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  {paymentOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
            
            {/* Segunda linha de filtros - Datas */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {/* Filtro por data inicial */}
              <Box sx={{ flex: '1 1 200px', minWidth: '150px' }}>
                <TextField
                  fullWidth
                  label="Data Inicial"
                  type="date"
                  variant="outlined"
                  size="small"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              
              {/* Filtro por data final */}
              <Box sx={{ flex: '1 1 200px', minWidth: '150px' }}>
                <TextField
                  fullWidth
                  label="Data Final"
                  type="date"
                  variant="outlined"
                  size="small"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
            
            {/* Terceira linha - Botões de ação */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={clearFilters}
                size="medium"
                sx={{ borderColor: '#4A148C', color: '#4A148C' }}
              >
                Limpar Filtros
              </Button>
              
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={applyFilters}
                size="medium"
                sx={{ backgroundColor: "#4A148C" }}
              >
                Aplicar Filtros
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Resumo dos Resultados */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: '8px' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Resumo</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: '1 1 200px' }}>
              <Typography variant="body1">
                Total de Vendas: <strong>{totalSales}</strong>
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 200px' }}>
              <Typography variant="body1">
                Valor Total: <strong>R$ {totalSalesValue.toFixed(2)}</strong>
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 200px' }}>
              <Typography variant="body1">
                Formas de Pagamento:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {Object.entries(
                  filteredSales.reduce((acc, sale) => {
                    const method = sale.formaPagamento;
                    acc[method] = (acc[method] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([method, count]) => (
                  <Chip 
                    key={method}
                    label={`${method}: ${count}`} 
                    size="small"
                    color={
                      method === "Dinheiro" ? "success" :
                      method === "Cartão" ? "primary" :
                      "secondary"
                    }
                    sx={
                      method === "Cartão" ? { backgroundColor: '#4A148C' } : {}
                    }
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Indicador de carregamento */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Tabela de Vendas */}
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '8px', mb: 3 }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#4A148C" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Nº</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Data</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Valor Total</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Valor Pago</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Troco</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Pagamento</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Itens</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSales.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        Nenhuma venda encontrada com os filtros selecionados
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSales.map((sale) => (
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
                        <TableCell>
                          {sale.itens ? sale.itens.length : 0} item(ns)
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

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

export default SalesHistoryScreen;
