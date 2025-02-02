import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Product } from "../api/client";

interface EditProductPageProps {
  open: boolean;
  product: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export function EditProductPage({
  open,
  product,
  onClose,
  onSave,
}: EditProductPageProps) {
  const [editedProduct, setEditedProduct] = useState<Product>(product);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    // Convert to integer for numeric fields
    const parsedValue =
      name === "stock" || name === "price"
        ? parseFloat(value) || 0 // Use parseFloat for price, converts to 0 if invalid
        : value;

    setEditedProduct({
      ...editedProduct,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedProduct);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="name"
                label="Product Name"
                value={editedProduct.name}
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
                value={editedProduct.price}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={editedProduct.category}
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
                value={editedProduct.stock}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="image"
                label="Image URL"
                value={editedProduct.image}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="age_range"
                label="Age Range"
                value={editedProduct.age_range}
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
                value={editedProduct.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
