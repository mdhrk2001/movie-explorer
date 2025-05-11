import { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Slider } from '@mui/material';
import { getGenres } from '../api/tmdb';

const currentYear = new Date().getFullYear();

const FilterControls = ({ onApply }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [rating, setRating] = useState([0, 10]);

  useEffect(() => {
    getGenres()
      .then(res => setGenres(res.data.genres))
      .catch(err => console.error('Failed to fetch genres', err));
  }, []);

  const handleApply = () => {
    onApply({
      genre: selectedGenre,
      year: selectedYear,
      rating,
    });
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FormControl sx={{ minWidth: 120, height: 40, justifyContent: 'center' }} size="small">
        <InputLabel>Genre</InputLabel>
        <Select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          label="Genre"
          sx={{ height: 40 }}
        >
          <MenuItem value="">All</MenuItem>
          {genres.map(genre => (
            <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, height: 40, mr:1 }} size="small">
        <InputLabel>Year</InputLabel>
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          label="Year"
          sx={{ height: 40 }}
        >
          <MenuItem value="">All</MenuItem>
          {Array.from({ length: 30 }, (_, i) => currentYear - i).map(year => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ width: 150, mr: 1 }}>
        <InputLabel>Rating</InputLabel>
        <Slider
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={10}
        />
      </Box>

      <Button sx={{ height: 40 }} variant="contained" onClick={handleApply}>Apply</Button>
    </Box>
  );
};

export default FilterControls;