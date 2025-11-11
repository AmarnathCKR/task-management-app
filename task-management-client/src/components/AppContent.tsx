import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { useState, useMemo } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import AppRoutes from '../routes/AppRoutes';
import { darkPalette, lightPalette } from '../constants/them';
import type { ThemeMode } from '../theme/themeConfig';

const AppContent = () => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(
    () =>
      createTheme({
        palette: mode === 'light' ? lightPalette : darkPalette,
        typography: {
          fontFamily: '"Space Grotesk", "Inter", sans-serif',
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 500,
                padding: '10px 24px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: '16px',
                boxShadow:
                  mode === 'light'
                    ? '0 4px 20px rgba(0,0,0,0.08)'
                    : '0 4px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow:
                    mode === 'light'
                      ? '0 8px 30px rgba(0,0,0,0.12)'
                      : '0 8px 30px rgba(0,0,0,0.4)',
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default AppContent;
