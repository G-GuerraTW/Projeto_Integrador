import { useState, useEffect } from "react";
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
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  FormHelperText
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Search, Add, Edit, Delete } from "@mui/icons-material";
import { SelectChangeEvent } from '@mui/material/Select';

// Interface que corresponderá ao modelo do backend
interface Product {
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

const ProductsScreen = () => {
  // Estados
  const [products, setProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
  const [product, setProduct] = useState<Product>({
    id: 0,
    nome: "",
    categoria: "",
    tamanho: "",
    cor: "",
    quantidade: 0,
    precoCusto: 0,
    precoVenda: 0,
    criadoEm: new Date().toISOString()
  });

  const navigate = useNavigate();

  // Carregar dados fictícios
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

    setProducts(mockProducts);

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

    fetchProducts();
    */
  }, []);

  // Funções para manipulação de produtos
  const handleInputChange = (

    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name as string]: value
    });
  };

  // Adicione esta função
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name as string]: value
    });
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!product.nome) errors.nome = "Nome é obrigatório";
    if (!product.categoria) errors.categoria = "Categoria é obrigatória";
    if (product.quantidade < 0) errors.quantidade = "Quantidade não pode ser negativa";
    if (product.precoCusto <= 0) errors.precoCusto = "Preço de custo deve ser maior que zero";
    if (product.precoVenda <= 0) errors.precoVenda = "Preço de venda deve ser maior que zero";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    if (product.id === 0) {
      // Adicionar novo produto
      const newProduct = {
        ...product,
        id: Date.now(), // Gera um ID único baseado no timestamp
        criadoEm: new Date().toISOString()
      };
      setProducts([...products, newProduct]);
    } else {
      // Atualizar produto existente
      setProducts(products.map(p => p.id === product.id ? product : p));
    }
    
    // Resetar formulário e fechar modal
    setProduct({
      id: 0,
      nome: "",
      categoria: "",
      tamanho: "",
      cor: "",
      quantidade: 0,
      precoCusto: 0,
      precoVenda: 0,
      criadoEm: new Date().toISOString()
    });
    setOpenModal(false);
  };

  const handleEdit = (id: number) => {
    const productToEdit = products.find(p => p.id === id);
    if (productToEdit) {
      setProduct(productToEdit);
      setOpenModal(true);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.categoria === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  // Calcular estatísticas
  const calculateStockByCategory = (category: string) => {
    return products
      .filter(product => product.categoria === category)
      .reduce((total, product) => total + product.quantidade, 0);
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
        <Typography color="text.primary">Cadastro de Produtos</Typography>
      </Breadcrumbs>

      <Typography variant="h4" gutterBottom>
        Cadastro e Gestão de Produtos
      </Typography>

      {/* Barra de Ações */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          label="Buscar Produto"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={categoryFilter}
            label="Categoria"
            onChange={(e) => setCategoryFilter(e.target.value as string)}
          >
            <MenuItem value="">Todas</MenuItem>
            <MenuItem value="Calçados">Calçados</MenuItem>
            <MenuItem value="Roupas">Roupas</MenuItem>
            <MenuItem value="Acessórios">Acessórios</MenuItem>
          </Select>
        </FormControl>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setOpenModal(true)}
        >
          Novo Produto
        </Button>
      </Box>

      {/* Cards de Estatísticas - Substituindo Grid por Box */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Box sx={{ flex: "1 1 calc(33.333% - 16px)", minWidth: "240px" }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Estoque de Calçados</Typography>
              <Typography variant="h4">{calculateStockByCategory("Calçados")}</Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: "1 1 calc(33.333% - 16px)", minWidth: "240px" }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Estoque de Roupas</Typography>
              <Typography variant="h4">{calculateStockByCategory("Roupas")}</Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: "1 1 calc(33.333% - 16px)", minWidth: "240px" }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Estoque de Acessórios</Typography>
              <Typography variant="h4">{calculateStockByCategory("Acessórios")}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Tabela de Produtos */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#4A148C" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Nome</TableCell>
              <TableCell sx={{ color: "white" }}>Categoria</TableCell>
              <TableCell sx={{ color: "white" }}>Tamanho</TableCell>
              <TableCell sx={{ color: "white" }}>Cor</TableCell>
              <TableCell sx={{ color: "white" }}>Estoque</TableCell>
              <TableCell sx={{ color: "white" }}>Preço de Venda</TableCell>
              <TableCell sx={{ color: "white" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.nome}</TableCell>
                  <TableCell>{product.categoria}</TableCell>
                  <TableCell>{product.tamanho}</TableCell>
                  <TableCell>{product.cor}</TableCell>
                  <TableCell>{product.quantidade}</TableCell>
                  <TableCell>R$ {product.precoVenda.toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(product.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(product.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nenhum produto encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de Cadastro/Edição - Substituindo Grid por Box */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {product.id === 0 ? "Novo Produto" : "Editar Produto"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
            <Box sx={{ width: "calc(50% - 8px)" }}>
              <TextField
                fullWidth
                label="Nome do Produto"
                name="nome"
                value={product.nome}
                onChange={handleInputChange}
                error={!!formErrors.nome}
                helperText={formErrors.nome}
              />
            </Box>
            
            <Box sx={{ width: "calc(50% - 8px)" }}>
              <FormControl fullWidth error={!!formErrors.categoria}>
                <InputLabel>Categoria</InputLabel>
                <Select
                  name="categoria"
                  value={product.categoria}
                  label="Categoria"

                  onChange={handleSelectChange}
                >
                  <MenuItem value="Calçados">Calçados</MenuItem>
                  <MenuItem value="Roupas">Roupas</MenuItem>
                  <MenuItem value="Acessórios">Acessórios</MenuItem>
                </Select>
                {formErrors.categoria && <FormHelperText>{formErrors.categoria}</FormHelperText>}
              </FormControl>
            </Box>
            
            <Box sx={{ width: "calc(50% - 8px)" }}>
              <TextField
                fullWidth
                label="Tamanho"
                name="tamanho"
                value={product.tamanho}
                onChange={handleInputChange}
              />
            </Box>
            
            <Box sx={{ width: "calc(50% - 8px)" }}>
              <TextField
                fullWidth
                label="Cor"
                name="cor"
                value={product.cor}
                onChange={handleInputChange}
              />
            </Box>
            
            <Box sx={{ width: "calc(33.333% - 8px)" }}>
              <TextField
                fullWidth
                label="Quantidade em Estoque"
                name="quantidade"
                type="number"
                value={product.quantidade}
                onChange={handleInputChange}
                error={!!formErrors.quantidade}
                helperText={formErrors.quantidade}
              />
            </Box>
            
            <Box sx={{ width: "calc(33.333% - 8px)" }}>
              <TextField
                fullWidth
                label="Preço de Custo"
                name="precoCusto"
                type="number"
                value={product.precoCusto}
                onChange={handleInputChange}
                error={!!formErrors.precoCusto}
                helperText={formErrors.precoCusto}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
              />
            </Box>
            
            <Box sx={{ width: "calc(33.333% - 8px)" }}>
              <TextField
                fullWidth
                label="Preço de Venda"
                name="precoVenda"
                type="number"
                value={product.precoVenda}
                onChange={handleInputChange}
                error={!!formErrors.precoVenda}
                helperText={formErrors.precoVenda}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsScreen;