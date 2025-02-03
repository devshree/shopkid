// Types based on swagger schemas
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: "clothes" | "toys";
  age_range: string;
  stock: number;
  image?: string;
}

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  category: "clothes" | "toys";
  age_range: string;
  stock: number;
  image?: string;
}

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface CartItemInput {
  product_id: number;
  quantity: number;
  price: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: "admin" | "buyer" | "other";
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: "admin" | "buyer" | "other";
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
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
