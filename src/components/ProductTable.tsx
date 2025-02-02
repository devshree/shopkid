import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Product } from "../api/client";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: number) => Promise<void>;
}

export function ProductTable({ products, onDelete }: ProductTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={async () => {
                    if (product.id) {
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
