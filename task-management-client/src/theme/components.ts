import type { Components, Theme } from '@mui/material/styles';

export const getComponentOverrides = (mode: string): Components<Omit<Theme, 'components'>> => ({
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
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
        },
      },
    },
  },
});
