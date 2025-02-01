import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar.tsx';
import HomePage from './pages/HomePage.tsx';
import Footer from './components/Footer.tsx';

// Create a warm, child-friendly theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B', // Warm coral color
      light: '#FFE2E2',
      dark: '#FF4949',
    },
    secondary: {
      main: '#4ECDC4', // Playful teal
      light: '#B4F1F1',
      dark: '#45B7B7',
    },
    background: {
      default: '#FFF9F9', // Soft warm background
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#2D3436',
    },
    h2: {
      fontWeight: 600,
      color: '#2D3436',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          padding: '8px 24px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main>
          <HomePage />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
