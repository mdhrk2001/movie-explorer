import { useState, useContext } from 'react';
import { TextField, IconButton, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { MovieContext } from '../context/MovieContext';
import { searchMovies, fetchTrendingMovies } from '../api/tmdb';
import { motion } from 'framer-motion';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { setMovies, setLastSearch } = useContext(MovieContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') return;

    try {
      const res = await searchMovies(query);
      setMovies(res.data.results);
      setLastSearch(query);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleClear = async () => {
    setQuery('');
    setLastSearch('');
    try {
      const res = await fetchTrendingMovies();
      setMovies(res.data.results);
    } catch (error) {
      console.error('Clear search failed:', error);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSearch} 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mb: 4,
        width: '100%' 
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ width: '100%', maxWidth: 650 }}
      >
        <TextField
          variant="outlined"
          placeholder="Search for movies, actors, franchises..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="medium"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" sx={{ ml: 1, opacity: 0.8 }} />
                </InputAdornment>
              ),
              endAdornment: query && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear} size="small" sx={{ mr: 1 }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 30,
              paddingRight: 1.5,
              fontSize: '1.05rem',
              boxShadow: (theme) => theme.palette.mode === 'light'
                ? '0 10px 25px -5px rgba(99, 102, 241, 0.08)'
                : '0 10px 30px -15px rgba(0, 0, 0, 0.7)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: (theme) => theme.palette.mode === 'light'
                  ? '0 10px 30px -5px rgba(99, 102, 241, 0.15)'
                  : '0 10px 30px -15px rgba(139, 92, 246, 0.25)',
              }
            }
          }}
        />
      </motion.div>
    </Box>
  );
};

export default SearchBar;