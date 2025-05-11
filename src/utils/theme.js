import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light theme
          primary: { main: '#1976d2' },
          background: { default: '#f5f5f5' },
          nav: {
            text: '#000000',
            background: '#e3f2fd',
            hover: '#bbdefb',
            active: '#90caf9',
          },
        }
      : {
          // Dark theme
          primary: { main: '#90caf9' },
          background: { default: '#121212' },
          nav: {
            text: '#ffffff',
            background: '#1e1e1e',
            hover: '#333333',
            active: '#1976d2',
          },
        }),
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
    h4: {
      fontWeight: 'bold',
    },
    h5: {
      fontWeight: 'bold',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease-in-out',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          paddingLeft: 20,
          paddingRight: 20,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});
