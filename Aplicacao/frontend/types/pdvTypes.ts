export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  stock?: number;
}

export interface Sale {
  id: number;
  clientName: string;
  total: number;
  date: string;
  items: SaleItem[];
}

export interface SaleItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}