import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Divider,
  SelectChangeEvent,
  InputAdornment,
  Snackbar,
  Alert
} from "@mui/material";
import { Add, Delete, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Interfaces baseadas na estrutura do backend
interface Produto {
  id: number;
  nome: string;
  categoria: string;
  tamanho: number;
  cor: string;
  quantidade: number;
  precoCusto: number;
  precoVenda: number;
  criadoEm: string;
}

interface ItemVenda {
  produtoId: number;
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
  subTotal: number;
}

interface Venda {
  usuario_Id: number;
  valorTotal: number;
  itensVenda: ItemVenda[];
}

const SalesScreen: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<number | "">("");
  const [quantidade, setQuantidade] = useState<number>(1);
  const [itensVenda, setItensVenda] = useState<ItemVenda[]>([]);
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

  const navigate = useNavigate();

  // Carregar produtos do backend
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        // Quando implementar o backend, descomente esta parte:
        /*
        const response = await fetch('http://localhost:5193/api/produto');
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const data = await response.json();
        setProdutos(data);
        */

        // Dados de exemplo (remova quando integrar com o backend)
        const mockProdutos: Produto[] = [
          {
            id: 1,
            nome: "Tênis Esportivo",
            categoria: "Calçados",
            tamanho: 42,
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
            tamanho: 3, // M
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
            tamanho: 1, // Único
            cor: "Azul",
            quantidade: 20,
            precoCusto: 15.00,
            precoVenda: 39.99,
            criadoEm: "2023-05-15T16:45:00"
          }
        ];
        setProdutos(mockProdutos);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        showAlert("Erro ao carregar produtos", "error");
      }
    };

    fetchProdutos();
  }, []);

  // Atualizar valor total quando itens são adicionados/removidos
  useEffect(() => {
    const total = itensVenda.reduce((sum, item) => sum + item.subTotal, 0);
    setValorTotal(total);
  }, [itensVenda]);

  const handleProdutoChange = (event: SelectChangeEvent<number | string>) => {
    setProdutoSelecionado(event.target.value as number);
  };

  const handleQuantidadeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantidade(parseInt(event.target.value) || 0);
  };

  const handleAddItem = () => {
    if (produtoSelecionado === "" || quantidade <= 0) {
      showAlert("Selecione um produto e quantidade válida", "error");
      return;
    }

    const produto = produtos.find(p => p.id === produtoSelecionado);
    
    if (!produto) {
      showAlert("Produto não encontrado", "error");
      return;
    }

    if (quantidade > produto.quantidade) {
      showAlert(`Quantidade indisponível. Estoque: ${produto.quantidade}`, "error");
      return;
    }

    // Verificar se o produto já está na lista
    const itemExistente = itensVenda.find(item => item.produtoId === produto.id);
    
    if (itemExistente) {
      // Atualizar quantidade se o produto já estiver na lista
      const novaQuantidade = itemExistente.quantidade + quantidade;
      
      if (novaQuantidade > produto.quantidade) {
        showAlert(`Quantidade total excede o estoque disponível`, "error");
        return;
      }
      
      const novosItens = itensVenda.map(item => 
        item.produtoId === produto.id 
          ? { 
              ...item, 
              quantidade: novaQuantidade,
              subTotal: novaQuantidade * produto.precoVenda 
            } 
          : item
      );
      
      setItensVenda(novosItens);
    } else {
      // Adicionar novo item
      const novoItem: ItemVenda = {
        produtoId: produto.id,
        produto: produto,
        quantidade: quantidade,
        precoUnitario: produto.precoVenda,
        subTotal: quantidade * produto.precoVenda
      };
      
      setItensVenda([...itensVenda, novoItem]);
    }
    
    // Resetar campos
    setProdutoSelecionado("");
    setQuantidade(1);
    showAlert("Item adicionado com sucesso", "success");
  };

  const handleRemoveItem = (produtoId: number) => {
    setItensVenda(itensVenda.filter(item => item.produtoId !== produtoId));
    showAlert("Item removido", "success");
  };

  const handleFinalizarVenda = async () => {
    if (itensVenda.length === 0) {
      showAlert("Adicione pelo menos um item para finalizar a venda", "error");
      return;
    }

    // Criar objeto de venda conforme esperado pelo backend
    const venda: Venda = {
      usuario_Id: 1, // ID do usuário logado (implementar autenticação futuramente)
      valorTotal: valorTotal,
      itensVenda: itensVenda
    };

    try {
      // Quando implementar o backend, descomente esta parte:
      /*
      const response = await fetch('http://localhost:5193/api/venda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venda),
      });

      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      const data = await response.json();
      */

      // Simulação de sucesso (remova quando integrar com o backend)
      console.log("Venda finalizada:", venda);
      
      // Limpar carrinho
      setItensVenda([]);
      setValorTotal(0);
      
      showAlert("Venda finalizada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao finalizar venda:", error);
      showAlert("Erro ao finalizar venda", "error");
    }
  };

  const showAlert = (message: string, severity: "success" | "error") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  // Função para formatar tamanho
  const formatarTamanho = (produto: Produto) => {
    if (produto.categoria === "Calçados") {
      return produto.tamanho.toString();
    } else if (produto.categoria === "Roupas") {
      const tamanhos = ["PP", "P", "M", "G", "GG", "XG"];
      return tamanhos[produto.tamanho - 1] || produto.tamanho.toString();
    } else {
      return "Único";
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
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
        <Typography color="text.primary">PDV - Realizar Venda</Typography>
      </Breadcrumbs>

      <Typography variant="h4" gutterBottom>
        PDV - Ponto de Venda
      </Typography>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        {/* Painel de Seleção de Produtos */}
        <Paper sx={{ p: 3, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Adicionar Produto
          </Typography>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Produto</InputLabel>
            <Select
              value={produtoSelecionado}
              onChange={handleProdutoChange}
              label="Produto"
            >
              {produtos.map((produto) => (
                <MenuItem key={produto.id} value={produto.id}>
                  {produto.nome} - {formatarTamanho(produto)} - {produto.cor} - R$ {produto.precoVenda.toFixed(2)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Quantidade"
            type="number"
            value={quantidade}
            onChange={handleQuantidadeChange}
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              inputProps: { min: 1 }
            }}
          />

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddItem}
            fullWidth
            sx={{ backgroundColor: "#4A148C" }}
            disabled={produtoSelecionado === "" || quantidade <= 0}
          >
            Adicionar ao Carrinho
          </Button>
        </Paper>

        {/* Carrinho de Compras */}
        <Paper sx={{ p: 3, flex: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <ShoppingCart sx={{ mr: 1 }} /> Carrinho de Compras
          </Typography>
          
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#4A148C" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Produto</TableCell>
                  <TableCell sx={{ color: "white" }}>Detalhes</TableCell>
                  <TableCell sx={{ color: "white" }} align="right">Preço Unit.</TableCell>
                  <TableCell sx={{ color: "white" }} align="right">Qtd</TableCell>
                  <TableCell sx={{ color: "white" }} align="right">Subtotal</TableCell>
                  <TableCell sx={{ color: "white" }} align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itensVenda.length > 0 ? (
                  itensVenda.map((item) => (
                    <TableRow key={item.produtoId}>
                      <TableCell>{item.produto.nome}</TableCell>
                      <TableCell>
                        {formatarTamanho(item.produto)} - {item.produto.cor}
                      </TableCell>
                      <TableCell align="right">
                        R$ {item.precoUnitario.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{item.quantidade}</TableCell>
                      <TableCell align="right">
                        R$ {item.subTotal.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton 
                          color="error" 
                          onClick={() => handleRemoveItem(item.produtoId)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Nenhum item adicionado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Resumo da Venda */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumo da Venda
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body1">Quantidade de Itens:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {itensVenda.reduce((sum, item) => sum + item.quantidade, 0)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  R$ {valorTotal.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleFinalizarVenda}
            disabled={itensVenda.length === 0}
            sx={{ 
              backgroundColor: "#4A148C", 
              py: 1.5,
              fontSize: "1.1rem"
            }}
          >
            Finalizar Venda
          </Button>
        </Paper>
      </Box>

      {/* Alerta de notificação */}
      <Snackbar 
        open={alertOpen} 
        autoHideDuration={4000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alertSeverity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SalesScreen;