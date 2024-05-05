import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Footer from '../components/Footer'; // Import the Footer component
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ImageUpdateProvider } from '@/contexts/ImageUpdateContext';



const coolTheme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B', // Vivid Red
    },
    secondary: {
      main: '#6BFFB4', // Greenish Cyan
    },
    background: {
      default: '#1A1A1A', // Dark Background
      paper: '#222222', // Slightly lighter background for cards and paper components
    },
    text: {
      primary: '#FFFFFF', // White text
      secondary: '#BFBFBF', // Light gray text
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#FF6B6B', // Use primary color for headers
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#6BFFB4', // Use secondary color for headers
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 12, // Slightly rounded corners for components
  },
  spacing: 8, // Global spacing unit (8px)
});


 


function MyApp({ Component, pageProps }) {
  return (
    <ImageUpdateProvider><AuthProvider>
      
    <ThemeProvider theme={coolTheme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box component="main" flexGrow={1}>
          <Component {...pageProps} />
        </Box>
        <Box component="footer">
          <Footer sx={{}} /> {/* This will render the Footer component */}
        </Box>
      </Box>
    </ThemeProvider></AuthProvider></ImageUpdateProvider>
  );
}

export default MyApp;
