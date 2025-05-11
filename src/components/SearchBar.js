import { useState, useContext } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MovieContext } from '../context/MovieContext';
import { searchMovies } from '../api/tmdb';

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

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <TextField
        variant="outlined"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="small"
        sx={{ width: '60%' }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;