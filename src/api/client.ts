import axios from 'axios';
import {
  CartItem,
  LoginRequest,
  LoginResponse,
  Order,
  Product,
  ProductInput,
  RegisterRequest,
  User,
  UserInput,
  UserProfile,
  UserUpdateInput,
} from "../types/types.ts";

// API client configuration
const API_BASE_URL = "http://localhost:8080/api";

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth token handling
export const setAuthToken = (token: string) => {
  if (token) {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common["Authorization"];
  }
};

// Auth API
export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await client.post("/auth/login", credentials);
    const { token } = response.data;
    setAuthToken(token);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<LoginResponse> => {
    const response = await client.post("/auth/register", userData);
    const { token } = response.data;
    setAuthToken(token);
    return response.data;
  },

  logout: () => {
    setAuthToken("");
  },
};

// Profile API
export const profileApi = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await client.get("/profile");
    return response.data;
  },

  updateProfile: async (profile: Partial<UserProfile>): Promise<void> => {
    await client.put("/profile", profile);
  },
};

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

  update: async (id: number, product: ProductInput): Promise<void> => {
    await client.put(`/products/${id}`, product);
  },

  delete: async (id: number): Promise<void> => {
    await client.delete(`/products/${id}`);
  },
};

// Cart API
export const cartApi = {
  getCart: async (): Promise<{ items: CartItem[] }> => {
    const response = await fetch("/api/cart", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }
    return response.json();
  },

  addToCart: async (productId: number): Promise<void> => {
    const response = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productId }),
    });
    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }
  },

  removeFromCart: async (productId: number): Promise<void> => {
    const response = await fetch("/api/cart/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productId }),
    });
    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }
  },
};

// Orders API
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    const response = await client.get("/orders");
    return response.data;
  },

  getById: async (id: number): Promise<Order> => {
    const response = await client.get(`/orders/${id}`);
    return response.data;
  },

  create: async (order: Order): Promise<void> => {
    await client.post("/orders", order);
  },

  update: async (id: number, order: Order): Promise<void> => {
    await client.put(`/orders/${id}`, order);
  },

  delete: async (id: number): Promise<void> => {
    await client.delete(`/orders/${id}`);
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
        case 401:
          // Handle unauthorized - clear token and redirect to login
          authApi.logout();
          // You might want to use a router here to redirect
          window.location.href = "/login";
          break;
        case 400:
          throw new Error("Invalid input data");
        case 404:
          throw new Error("Resource not found");
        case 500:
          throw new Error("Internal server error");
        default:
          throw new Error("An unexpected error occurred");
      }
    }
    throw error;
  }
); 