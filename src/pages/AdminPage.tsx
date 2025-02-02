import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { productsApi } from "../api/client.ts";
import { ProductTable } from "../components/ProductTable.tsx";

interface Product {
  id?: number;
  name: string;
  price: number;
  image: string;
  category: "clothes" | "toys" | string;
}

function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: 0,
    image: "",
    category: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productsApi.getAll();
      const formattedProducts = response.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image || "",
        category: p.category,
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name as string]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productInput = {
        name: newProduct.name,
        price: parseFloat(newProduct.price.toString()),
        category: newProduct.category as "clothes" | "toys",
        age_range: "0-12",
        stock: 100,
        image: newProduct.image,
      };

      await productsApi.create(productInput);
      setNewProduct({
        name: "",
        price: 0,
        image: "",
        category: "",
      });
      loadProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await productsApi.delete(id);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="name"
                label="Product Name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="price"
                label="Price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={newProduct.category}
                  label="Category"
                  onChange={handleInputChange}
                >
                  <MenuItem value="clothes">Clothes</MenuItem>
                  <MenuItem value="toys">Toys</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="image"
                label="Image URL"
                value={newProduct.image}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <ProductTable products={products} onDelete={handleDeleteProduct} />
    </Container>
  );
}

export default AdminPage;
