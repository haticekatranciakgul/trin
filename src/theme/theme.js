import { createTheme } from '@mui/material/styles';

const commonTheme = {
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 4px 6px rgba(0, 0, 0, 0.1)',
    '0px 8px 15px rgba(0, 0, 0, 0.1)',
    '0px 10px 20px rgba(0, 0, 0, 0.1)',
    '0px 15px 25px rgba(0, 0, 0, 0.1)',
    '0px 20px 30px rgba(0, 0, 0, 0.1)',
    '0px 25px 35px rgba(0, 0, 0, 0.1)',
    '0px 30px 40px rgba(0, 0, 0, 0.12)',
    '0px 35px 45px rgba(0, 0, 0, 0.12)',
    '0px 40px 50px rgba(0, 0, 0, 0.14)',
    '0px 45px 55px rgba(0, 0, 0, 0.14)',
    '0px 50px 60px rgba(0, 0, 0, 0.16)',
    '0px 55px 65px rgba(0, 0, 0, 0.16)',
    '0px 60px 70px rgba(0, 0, 0, 0.18)',
    '0px 65px 75px rgba(0, 0, 0, 0.18)',
    '0px 70px 80px rgba(0, 0, 0, 0.20)',
    '0px 75px 85px rgba(0, 0, 0, 0.20)',
    '0px 80px 90px rgba(0, 0, 0, 0.22)',
    '0px 85px 95px rgba(0, 0, 0, 0.22)',
    '0px 90px 100px rgba(0, 0, 0, 0.24)',
    '0px 95px 105px rgba(0, 0, 0, 0.24)',
    '0px 100px 110px rgba(0, 0, 0, 0.26)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 6,
          padding: '8px 16px',
          fontSize: '0.875rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: 'none',
          boxShadow: 'none', // Tüm shadow'ları kaldır
          '&:hover': {
            boxShadow: 'none', // Hover'da da shadow yok
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Paper component'inin shadow'larını kaldır
          backgroundImage: 'none', // Paper overlay gradient'ini kaldır
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'var(--background-color)',
        },
        ':root': {
          '--background-color': '#f8fafc',
          '--text-color': 'rgba(0, 0, 0, 0.87)',
          '--card-background': '#ffffff',
          '--primary-color': '#3b82f6',
          '--success-color': '#10b981',
          '--error-color': '#ef4444',
          '--warning-color': '#f59e0b',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    info: {
      main: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  components: {
    ...commonTheme.components,
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'url(/dashboard-light-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
        ':root': {
          '--background-color': '#f8fafc',
          '--text-color': '#1f2937',
          '--card-background': '#ffffff',
          '--primary-color': '#3b82f6',
          '--success-color': '#10b981',
          '--error-color': '#ef4444',
          '--warning-color': '#f59e0b',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#000000ff',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    background: {
      default: '#0f172a',
      paper: '#000000',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    primary: {
      main: '#60a5fa',
      light: '#93c5fd',
      dark: '#3b82f6',
    },
    secondary: {
      main: '#a78bfa',
      light: '#c4b5fd',
      dark: '#8b5cf6',
    },
    success: {
      main: '#34d399',
      light: '#6ee7b7',
      dark: '#10b981',
    },
    error: {
      main: '#f87171',
      light: '#fca5a5',
      dark: '#ef4444',
    },
    warning: {
      main: '#fbbf24',
      light: '#fcd34d',
      dark: '#f59e0b',
    },
    info: {
      main: '#22d3ee',
      light: '#67e8f9',
      dark: '#06b6d4',
    },
    grey: {
      50: '#1e293b',
      100: '#334155',
      200: '#475569',
      300: '#64748b',
      400: '#94a3b8',
      500: '#cbd5e1',
      600: '#e2e8f0',
      700: '#f1f5f9',
      800: '#f8fafc',
      900: '#ffffff',
    },
  },
  components: {
    ...commonTheme.components,
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'url(/dashboard-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
        ':root': {
          '--background-color': '#000000',
          '--text-color': '#f1f5f9',
          '--card-background': '#1e293b',
          '--primary-color': '#60a5fa',
          '--success-color': '#34d399',
          '--error-color': '#f87171',
          '--warning-color': '#fbbf24',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          boxShadow: '0px 1px 3px rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});