import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { Product, getProducts, createSale } from "../api/pdvApi";

const PdvScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const handleCheckout = async () => {
    try {
      await createSale({
        items: cart.map(item => ({
          productId: item.id,
          quantity: 1,
          price: item.price
        }))
      });
      setCart([]);
      alert("Venda registrada!");
    } catch (error) {
      console.error("Erro ao finalizar venda:", error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Ponto de Venda
      </Typography>

      <Grid container spacing={3} component="div">
        {/* Lista de Produtos */}
      <Grid component="div">
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Produtos
            </Typography>
            <Grid container spacing={2} component="div">
              {products.map(product => (
                <Grid component="div">
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleAddToCart(product)}
                  >
                    {product.name} - R$ {product.price.toFixed(2)}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Carrinho */}
        <Grid >
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Carrinho ({cart.length})
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell>Preço</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>R$ {item.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              Finalizar Venda (Total: R${" "}
              {cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)})
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PdvScreen;