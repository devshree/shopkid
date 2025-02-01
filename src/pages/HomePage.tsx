import React from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Button,
  Box,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.secondary.light} 90%)`,
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(4),
  borderRadius: 0,
}));

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const products = [
  {
    id: 1,
    name: 'Rainbow T-Shirt',
    price: '$19.99',
    image: 'https://via.placeholder.com/200x200?text=Kids+Tshirt',
    category: 'Clothing'
  },
  {
    id: 2,
    name: 'Wooden Building Blocks',
    price: '$29.99',
    image: 'https://via.placeholder.com/200x200?text=Toy+Blocks',
    category: 'Toys'
  },
  // Add more products as needed
];

function HomePage() {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <HeroSection>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom align="center" sx={{ color: 'text.primary' }}>
            Welcome to KidsCorner
          </Typography>
          <Typography variant="h5" align="center" sx={{ color: 'text.secondary', mb: 4 }}>
            Discover magical clothing & toys for your little ones
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" size="large">
              Shop Now
            </Button>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Featured Products
        </Typography>
        
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.category}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {product.price}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage; 