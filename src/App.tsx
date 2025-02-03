import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import CartPage from "./components/CartPage.tsx";
import Footer from "./components/Footer.tsx";
import Navbar from "./components/Navbar.tsx";
import UserProfilePage from "./components/UserProfilePage.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import ClothingPage from "./pages/ClothingPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import SalePage from "./pages/SalePage.tsx";
import ToysPage from "./pages/ToysPage.tsx";

// Create a warm, child-friendly theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B6B", // Warm coral color
      light: "#FFE2E2",
      dark: "#FF4949",
    },
    secondary: {
      main: "#4ECDC4", // Playful teal
      light: "#B4F1F1",
      dark: "#45B7B7",
    },
    background: {
      default: "#FFF9F9", // Soft warm background
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: "#2D3436",
    },
    h2: {
      fontWeight: 600,
      color: "#2D3436",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: "none",
          padding: "8px 24px",
        },
      },
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Navbar />
              <main>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/clothing"
                    element={
                      <ProtectedRoute>
                        <ClothingPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/toys"
                    element={
                      <ProtectedRoute>
                        <ToysPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/sale"
                    element={
                      <ProtectedRoute>
                        <SalePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <UserProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <CartPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
