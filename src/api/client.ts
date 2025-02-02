import axios from 'axios';

// Types based on swagger schemas
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: "clothes" | "toys";
  age_range: string;
  stock: number;
  image: string;
}

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  category: "clothes" | "toys";
  age_range: string;
  stock: number;
  image: string;
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

// User related interfaces
export interface User {
  id: number;
  username: string;
  email: string;
  // password is not included in response
}

export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export interface UserUpdateInput {
  username?: string;
  email?: string;
  password?: string;
}

//  client configuration
const API_BASE_URL = "http://localhost:8080/api";

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
client.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url, config.method);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Update response interceptor with better error handling
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error data:', error.response.data);
      console.error('Response error status:', error.response.status);
      console.error('Response error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await client.get("/products");
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await client.get(`/products/${id}`);
    return response.data;
  },

  create: async (product: ProductInput): Promise<Product> => {
    const response = await client.post("/products", product);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await client.delete(`/products/${id}`);
  },

  update: async (id: number, product: ProductInput): Promise<Product> => {
    const response = await client.put(`/products/${id}`, product);
    return response.data;
  },
};

// Cart API
export const cartApi = {
  getContents: async (): Promise<CartItem[]> => {
    const response = await client.get('/cart');
    return response.data;
  },

  addItem: async (item: CartItemInput): Promise<CartItem> => {
    const response = await client.post('/cart/add', item);
    return response.data;
  },

  removeItem: async (id: number): Promise<void> => {
    await client.delete(`/cart/remove/${id}`);
  },
};

// User API
export const userApi = {
  getCurrentUser: async (): Promise<User> => {
    const response = await client.get("/user/me");
    return response.data;
  },

  updateProfile: async (updates: UserUpdateInput): Promise<User> => {
    const response = await client.put("/user/profile", updates);
    return response.data;
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await client.post("/user/change-password", {
      oldPassword,
      newPassword,
    });
  },

  register: async (userData: UserInput): Promise<User> => {
    const response = await client.post("/user/register", userData);
    return response.data;
  },

  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    const response = await client.post("/user/login", { email, password });
    return response.data;
  },
};

// Error handling middleware
client.interceptors.response.use(
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