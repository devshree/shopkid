import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { useCart } from "../context/CartContext.tsx";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
}));

const NavButton = styled(Button)<{
  component?: React.ElementType;
  to?: string;
}>(({ theme }) => ({
  color: theme.palette.text.primary,
  margin: "0 8px",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

function Navbar() {
  // This is a placeholder - replace with your actual auth state management
  const { user, setUser } = useAuth();
  const { cartCount } = useCart();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              color: "primary.main",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            KidsCorner
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NavButton component={RouterLink} to="/clothing">
              Clothing
            </NavButton>
            <NavButton component={RouterLink} to="/toys">
              Toys
            </NavButton>
            <NavButton component={RouterLink} to="/sale">
              Sale
            </NavButton>

            {user ? (
              <>
                <IconButton
                  color="primary"
                  component={RouterLink}
                  to="/profile"
                >
                  <PersonIcon />
                </IconButton>
                <NavButton onClick={handleLogout}>Logout</NavButton>
              </>
            ) : (
              <NavButton component={RouterLink} to="/login">
                Login
              </NavButton>
            )}

            <IconButton color="primary" component={RouterLink} to="/cart">
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}

export default Navbar;
