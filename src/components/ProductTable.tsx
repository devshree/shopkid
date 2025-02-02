import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { Product } from "../api/client";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (product: Product) => void;
}

export function ProductTable({
  products,
  onDelete,
  onEdit,
}: ProductTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Age Range</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Image URL</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.age_range}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.image}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={async () => {
                      if (
                        product.id &&
                        window.confirm(
                          "Are you sure you want to delete this product?"
                        )
                      ) {
                        try {
                          await onDelete(product.id);
                        } catch (error) {
                          console.error("Error deleting product:", error);
                        }
                      }
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
