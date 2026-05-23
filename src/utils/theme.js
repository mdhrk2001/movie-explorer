import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Modern, clean, warm minimalist light theme
          primary: {
            main: '#6366F1', // Premium Indigo
            light: '#818CF8',
            dark: '#4F46E5',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#EC4899', // Hot Pink
            light: '#F472B6',
            dark: '#DB2777',
            contrastText: '#ffffff',
          },
          background: {
            default: '#F8FAFC', // Slate 50
            paper: '#FFFFFF',
          },
          text: {
            primary: '#0F172A', // Slate 900
            secondary: '#475569', // Slate 600
          },
          nav: {
            text: '#1E293B',
            background: 'rgba(255, 255, 255, 0.75)',
            hover: 'rgba(99, 102, 241, 0.08)',
            active: 'rgba(99, 102, 241, 0.15)',
          },
        }
      : {
          // Cinematic space midnight dark theme
          primary: {
            main: '#8B5CF6', // Electric Purple
            light: '#A78BFA',
            dark: '#7C3AED',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#EC4899', // Hot Pink
            light: '#F472B6',
            dark: '#DB2777',
            contrastText: '#ffffff',
          },
          background: {
            default: '#030712', // Rich Midnight
            paper: '#111827', // Slate 900
          },
          text: {
            primary: '#F9FAFB', // Slate 50
            secondary: '#9CA3AF', // Slate 400
          },
          nav: {
            text: '#F3F4F6',
            background: 'rgba(17, 24, 39, 0.75)',
            hover: 'rgba(139, 92, 246, 0.08)',
            active: 'rgba(139, 92, 246, 0.15)',
          },
        }),
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "'Outfit', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontFamily: "'Syne', sans-serif", fontWeight: 800 },
    h2: { fontFamily: "'Syne', sans-serif", fontWeight: 800 },
    h3: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
    h4: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
    h5: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
    h6: { fontFamily: "'Syne', sans-serif", fontWeight: 600 },
    subtitle1: { fontWeight: 500, letterSpacing: '0.01em' },
    subtitle2: { fontWeight: 400 },
    body1: { letterSpacing: '0.015em', lineHeight: 1.6 },
    body2: { letterSpacing: '0.01em', lineHeight: 1.5 },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      }),
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 20,
          backgroundImage: 'none',
          boxShadow: theme.palette.mode === 'light' 
            ? '0 10px 30px -5px rgba(0,0,0,0.05), 0 4px 12px -5px rgba(0,0,0,0.03)'
            : '0 10px 35px -10px rgba(0,0,0,0.5), 0 4px 12px -5px rgba(0,0,0,0.4)',
          border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: theme.palette.background.paper,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          paddingLeft: 24,
          paddingRight: 24,
          fontWeight: 600,
          boxShadow: 'none',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: ({ theme }) => ({
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: '#ffffff',
          '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
            boxShadow: theme.palette.mode === 'light'
              ? '0 8px 20px rgba(99, 102, 241, 0.35)'
              : '0 8px 20px rgba(139, 92, 246, 0.35)',
          },
        }),
        containedSecondary: ({ theme }) => ({
          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
          color: '#ffffff',
          '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
            boxShadow: '0 8px 20px rgba(236, 72, 153, 0.35)',
          },
        }),
        outlined: ({ theme }) => ({
          borderWidth: '1.5px',
          borderColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            transition: 'all 0.25s ease',
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.01)' : 'rgba(255,255,255,0.02)',
            '& fieldset': {
              borderColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)',
              borderWidth: '1.5px',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderWidth: '2px',
              boxShadow: theme.palette.mode === 'light'
                ? '0 0 0 4px rgba(99, 102, 241, 0.12)'
                : '0 0 0 4px rgba(139, 92, 246, 0.15)',
            },
          },
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 14,
          backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.01)' : 'rgba(255,255,255,0.02)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)',
            borderWidth: '1.5px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '2px',
          },
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 14,
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          color: theme.palette.text.secondary,
          '&:hover': {
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)',
            color: theme.palette.text.primary,
          },
        }),
      },
    },
  },
});

