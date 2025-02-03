import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { cartApi } from "../api/client.ts";
import { useCart } from "../context/CartContext.tsx";
import { Product, CartItem, CartItemInput } from "../types/types.ts";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4],
  },
}));

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { cartCount, isLoading, error } = useCart();

  const handleAddToCart = async () => {
    const cartItem: CartItemInput = {
      product_id: product.id,
      quantity: 1,
      price: product.price,
      product: product,
    };
    try {
      await cartApi.addToCart(cartItem);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      // You might want to add a toast/snackbar notification here
    }
  };

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Age: {product.age_range}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          ${product.price}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
}
