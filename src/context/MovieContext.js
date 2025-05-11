import { createContext, useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../api/tmdb';
import { loadFavorites, saveFavorites, loadLastSearch, saveLastSearch } from '../utils/localStorageUtils';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(loadFavorites());
  const [themeMode, setThemeMode] = useState('light');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [lastSearch, setLastSearch] = useState(loadLastSearch());

  // Fetch trending movies on mount
  useEffect(() => {
    fetchTrendingMovies()
      .then(res => setMovies(res.data.results))
      .catch(err => console.error('Error fetching trending movies:', err));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  // Save lastSearch to localStorage
  useEffect(() => {
    saveLastSearch(lastSearch);
  }, [lastSearch]);

  // Save user to localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addFavorite = (movie) => {
    if (!favorites.find(fav => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (movieId) => {
    setFavorites(favorites.filter(fav => fav.id !== movieId));
  };

  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const login = (username, password) => {
    // Simulate a non-empty user's login process
    if (username && password) {
      const userObj = { username };
      setUser(userObj);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setLastSearch('');
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
    localStorage.removeItem('lastSearch');
  };

  const isAuthenticated = !!user;

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        favorites,
        addFavorite,
        removeFavorite,
        themeMode,
        toggleTheme,
        user,
        login,
        logout,
        isAuthenticated,
        lastSearch,
        setLastSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;