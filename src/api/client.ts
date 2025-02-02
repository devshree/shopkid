import axios from 'axios';

// Types based on swagger schemas
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: 'clothes' | 'toys';
  age_range: string;
  stock: number;
}

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  category: 'clothes' | 'toys';
  age_range: string;
  stock: number;
}

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface CartItemInput {
  product_id: number;
  quantity: number;
  price: number;
}

// API client configuration
const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/api/products');
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },

  create: async (product: ProductInput): Promise<Product> => {
    const response = await api.post('/api/products', product);
    return response.data;
  },
};

// Cart API
export const cartApi = {
  getContents: async (): Promise<CartItem[]> => {
    const response = await api.get('/api/cart');
    return response.data;
  },

  addItem: async (item: CartItemInput): Promise<CartItem> => {
    const response = await api.post('/api/cart/add', item);
    return response.data;
  },

  removeItem: async (id: number): Promise<void> => {
    await api.delete(`/api/cart/remove/${id}`);
  },
};

// Error handling middleware
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error('Invalid input data');
        case 404:
          throw new Error('Resource not found');
        case 500:
          throw new Error('Internal server error');
        default:
          throw new Error('An unexpected error occurred');
      }
    }
    throw error;
  }
); 