import axios from "axios";

// Para Create React App (CRA)
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Se estiver usando Vite, substitua por:
// const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL });

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};

export const createSale = async (saleData: {
  items: Array<{ productId: number; quantity: number; price: number }>;
}) => {
  const response = await api.post("/sales", saleData);
  return response.data;
};