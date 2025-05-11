import PageWrapper from '../components/PageWrapper';
import { useContext, useEffect, useState } from 'react';
import {
  Container, Grid, Typography, Button, Box, Alert
} from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import SearchBar from '../components/SearchBar';
import FilterControls from '../components/FilterControls';
import { searchMovies, fetchTrendingMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import ResponsiveNavbar from '../components/ResponsiveNavbar';

const Home = () => {
  const { movies, setMovies, lastSearch } = useContext(MovieContext);
  const [filters, setFilters] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch trending movies on first load
    const fetchInitialMovies = async () => {
      try {
        setError(null);
        const res = await fetchTrendingMovies();
        setMovies(res.data.results);
      } catch (err) {
        console.error('Error fetching trending movies:', err);
        if (err.response && err.response.status === 401) {
          setError('Invalid API key. Please check your TMDb API key configuration.');
        } else {
          setError('Something went wrong while fetching movies. Please try again later.');
        }
      }
    };

    if (!lastSearch) {
      fetchInitialMovies();
    }
  }, [setMovies, lastSearch]);

  const handleApplyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
    fetchFilteredMovies(selectedFilters, 1);
  };

  const fetchFilteredMovies = async (filters, pageNum) => {
    try {
      setError(null);
      let res;
      let results = [];

      if (lastSearch) {
        // Search API if query exists
        res = await searchMovies(lastSearch, pageNum);
        results = res.data.results;
      } else {
        // Trending API if no search query
        res = await fetchTrendingMovies(pageNum);
        results = res.data.results;
      }

      // Apply filters (if any)
      if (filters) {
        if (filters.genre) {
          results = results.filter(m => m.genre_ids.includes(Number(filters.genre)));
        }
        if (filters.year) {
          results = results.filter(m => m.release_date?.startsWith(filters.year));
        }
        results = results.filter(m =>
          m.vote_average >= filters.rating[0] && m.vote_average <= filters.rating[1]
        );
      }

      if (pageNum === 1) {
        setMovies(results);
      } else {
        setMovies(prev => [...prev, ...results]);
      }

      setPage(pageNum);
      setHasMore(res.data.page < res.data.total_pages);
    } catch (err) {
      console.error('Error fetching movies:', err);
      if (err.response && err.response.status === 401) {
        setError('Invalid API key. Please check your TMDb API key configuration.');
      } else {
        setError('Something went wrong while fetching movies. Please try again later.');
      }
    }
  };

  const handleLoadMore = () => {
    fetchFilteredMovies(filters, page + 1);
  };

  return (
    <PageWrapper>
      <ResponsiveNavbar />

      <Container sx={{ mt: { xs: 2, md: 4 }, mb: 4 }}>
        <SearchBar />
        <FilterControls onApply={handleApplyFilters} />

        <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
          {lastSearch ? `Results for "${lastSearch}"` : 'Trending Movies'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4.5} justifyContent="center">
          {movies.map(movie => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>

        {!error && hasMore && movies.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button variant="contained" size="large" onClick={handleLoadMore}>
              Load More
            </Button>
          </Box>
        )}
      </Container>
    </PageWrapper>
  );
};

export default Home;