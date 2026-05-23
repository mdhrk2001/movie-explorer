import { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Slider, Typography, Collapse, useMediaQuery } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { getGenres } from '../api/tmdb';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const currentYear = new Date().getFullYear();

const FilterControls = ({ onApply }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isOpen, setIsOpen] = useState(!isMobile);
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

  const handleReset = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setRating([0, 10]);
    onApply({
      genre: '',
      year: '',
      rating: [0, 10],
    });
  };

  return (
    <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isMobile && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FilterListIcon />}
          onClick={() => setIsOpen(!isOpen)}
          sx={{ mb: 2, borderRadius: 8, px: 3 }}
        >
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
      )}

      <Collapse in={isOpen} sx={{ width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              flexWrap: 'wrap',
              gap: 3,
              p: 3,
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(17, 24, 39, 0.45)',
              backdropFilter: 'blur(16px)',
              border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}`,
              boxShadow: theme.palette.mode === 'light' 
                ? '0 10px 30px -10px rgba(0,0,0,0.03)' 
                : '0 10px 40px -15px rgba(0,0,0,0.4)',
            }}
          >
            {/* Genre Select */}
            <FormControl sx={{ minWidth: 160 }} size="medium">
              <InputLabel id="genre-select-label">Genre</InputLabel>
              <Select
                labelId="genre-select-label"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                label="Genre"
                sx={{ borderRadius: 3 }}
              >
                <MenuItem value=""><em>All Genres</em></MenuItem>
                {genres.map(genre => (
                  <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Year Select */}
            <FormControl sx={{ minWidth: 140 }} size="medium">
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                labelId="year-select-label"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                label="Year"
                sx={{ borderRadius: 3 }}
              >
                <MenuItem value=""><em>All Years</em></MenuItem>
                {Array.from({ length: 40 }, (_, i) => currentYear - i).map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Rating Slider */}
            <Box sx={{ width: { xs: '100%', md: 250 }, px: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5, color: theme.palette.text.secondary }}>
                Minimum Rating: ⭐ {rating[0]} - {rating[1]}
              </Typography>
              <Slider
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={10}
                step={0.5}
                color="primary"
                sx={{ py: 1 }}
              />
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', md: 'auto' }, justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={handleApply}
                startIcon={<FilterListIcon />}
                sx={{ flex: { xs: 1, md: 'none' }, borderRadius: 3, px: 3, py: 1.2 }}
              >
                Apply Filters
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReset}
                startIcon={<ClearAllIcon />}
                sx={{ flex: { xs: 1, md: 'none' }, borderRadius: 3, px: 3, py: 1.2 }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Collapse>
    </Box>
  );
};

export default FilterControls;