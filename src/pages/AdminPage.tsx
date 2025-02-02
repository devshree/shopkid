import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Product, ProductInput } from "../api/client";
import { productsApi } from "../api/client.ts";
import { EditProductPage } from "../components/EditProductPage";
import { ProductTable } from "../components/ProductTable.tsx";

function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<ProductInput>({
    name: "",
    price: 0,
    image: "",
    category: "clothes",
    stock: 0,
    description: "",
    age_range: "",
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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
        stock: p.stock,
        description: p.description,
        age_range: p.age_range,
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
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
        age_range: newProduct.age_range,
        stock: parseInt(newProduct.stock.toString()),
        image: newProduct.image,
        description: newProduct.description,
      };

      await productsApi.create(productInput);
      setNewProduct({
        name: "",
        price: 0,
        image: "",
        category: "clothes",
        age_range: "",
        stock: 0,
        description: "",
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

  const handleEdit = async (product: Product) => {
    try {
      await productsApi.update(product.id, product);
      loadProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
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
                type="number"
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
                name="stock"
                label="Stock"
                type="number"
                value={newProduct.stock}
                onChange={handleInputChange}
              />
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
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="age_range"
                label="Age Range"
                value={newProduct.age_range}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="description"
                label="Description"
                multiline
                rows={4}
                value={newProduct.description}
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

      <ProductTable
        products={products}
        onDelete={handleDeleteProduct}
        onEdit={(product) => setEditingProduct(product)}
      />

      {editingProduct && (
        <EditProductPage
          open={!!editingProduct}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleEdit}
        />
      )}
    </Container>
  );
}

export default AdminPage;
