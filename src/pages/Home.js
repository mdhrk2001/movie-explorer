import PageWrapper from '../components/PageWrapper';
import { useContext, useEffect, useState } from 'react';
import {
  Container, Grid, Typography, Button, Box, Alert, CircularProgress
} from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import SearchBar from '../components/SearchBar';
import FilterControls from '../components/FilterControls';
import { searchMovies, fetchTrendingMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import ResponsiveNavbar from '../components/ResponsiveNavbar';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const Home = () => {
  const theme = useTheme();
  const { movies, setMovies, lastSearch } = useContext(MovieContext);
  const [filters, setFilters] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch trending movies on first load
    const fetchInitialMovies = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
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
      setLoading(true);
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

      // Apply filters(if any)
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
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchFilteredMovies(filters, page + 1);
  };

  // Find a random movie with a high rating to showcase as the Hero image
  const featuredMovie = movies && movies.length > 0 ? movies[0] : null;
  const heroBackdropUrl = featuredMovie && featuredMovie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
    : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop';

  return (
    <PageWrapper>
      <ResponsiveNavbar />

      {/* Cinematic Grand Hero Header */}
      {!lastSearch && (
        <Box 
          sx={{ 
            position: 'relative', 
            height: { xs: '380px', md: '520px' }, 
            width: '100%', 
            overflow: 'hidden', 
            mt: { xs: 2, md: 3 },
            px: { xs: 1.5, md: 4 },
            boxSizing: 'border-box'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: 6,
              overflow: 'hidden',
              backgroundImage: `url(${heroBackdropUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%',
              boxShadow: theme.palette.mode === 'light' 
                ? '0 15px 35px -10px rgba(0,0,0,0.1)' 
                : '0 20px 50px -15px rgba(0,0,0,0.8)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to right, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.6) 40%, rgba(3, 7, 18, 0.2) 80%, rgba(3, 7, 18, 0.1) 100%)',
                zIndex: 1,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '150px',
                background: 'linear-gradient(to top, rgba(3, 7, 18, 0.95) 0%, transparent 100%)',
                zIndex: 1,
              }
            }}
          >
            <Container sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', px: { xs: 3, md: 6 } }}>
              <Box sx={{ maxWidth: 600, color: '#ffffff' }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Typography variant="overline" sx={{ fontWeight: 800, color: theme.palette.secondary.main, letterSpacing: '0.15em', display: 'inline-block', mb: 1 }}>
                    NOW TRENDING
                  </Typography>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' }, lineHeight: 1.1, fontFamily: "'Syne', sans-serif" }}>
                    {featuredMovie ? featuredMovie.title : 'Explore the Cinematic Universe'}
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Typography variant="body1" sx={{ mb: 3.5, color: '#D1D5DB', fontWeight: 400, opacity: 0.9, display: { xs: 'none', sm: '-webkit-box' }, overflow: 'hidden', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {featuredMovie ? featuredMovie.overview : 'Search, filter, and discover hundreds of popular titles, from blockbusters to indie hits. Save your personal favorites to curate your unique cinematic shelf.'}
                  </Typography>
                </motion.div>
              </Box>
            </Container>
          </Box>
        </Box>
      )}

      <Container sx={{ mt: { xs: 4, md: 5 }, mb: 6 }}>
        <SearchBar />
        <FilterControls onApply={handleApplyFilters} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 4, mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.text.primary, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            {lastSearch ? `Results for "${lastSearch}"` : 'Popular Releases'}
          </Typography>
          {loading && <CircularProgress size={24} />}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={{ xs: 2, sm: 3, md: 4.5 }} justifyContent="center">
          {movies.map(movie => (
            <Grid key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>

        {!movies.length && !loading && !error && (
          <Box sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No movies matched your search parameters. Try adjusting the filters!
            </Typography>
          </Box>
        )}

        {!error && hasMore && movies.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleLoadMore}
              disabled={loading}
              sx={{ px: 5, py: 1.5, borderRadius: 8, fontSize: '1rem', boxShadow: 'none' }}
            >
              {loading ? 'Loading...' : 'Load More Releases'}
            </Button>
          </Box>
        )}
      </Container>
    </PageWrapper>
  );
};

export default Home;