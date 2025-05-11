import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider, MovieContext } from './context/MovieContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getAppTheme } from './utils/theme';

import Home from './pages/Home';
import DetailsPage from './pages/DetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';

function AppContent() {
  const { themeMode } = useContext(MovieContext);
  const theme = getAppTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<DetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <MovieProvider>
      <AppContent />
    </MovieProvider>
  );
}

export default App;