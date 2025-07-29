import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import React from 'react';
import '../App.css';
import Navbar from '../components/ui/Navbar';
import { ThemeProvider, useTheme } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';

// Modüler rota fonksiyonlarını import et
import { getAppRoutes } from './appRoutes';

// Rota yollarını constants'tan import et
import { PATHS, APP_PATHS } from '../constants/routes';

function AppContent() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
    </MuiThemeProvider>
  );
}

// Router içindeki ayrı component
function AppRoutes() {
  const location = useLocation();

  // Navbar'ın gizleneceği sayfalar
  // const hideNavbarRoutes = [AUTH_PATHS.LOGIN, AUTH_PATHS.REGISTER];
  // const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Sadece ana uygulama rotaları */}
          {getAppRoutes()}
          {/* Ana sayfa yönlendirmesi */}
          <Route path={PATHS.HOME} element={<Navigate to={APP_PATHS.DASHBOARD} replace />} />
          {/* 404 sayfası */}
          <Route path={PATHS.NOT_FOUND} element={<Navigate to={APP_PATHS.DASHBOARD} replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App; 