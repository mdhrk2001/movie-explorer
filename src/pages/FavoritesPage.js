import { useContext } from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import PageWrapper from '../components/PageWrapper';
import ResponsiveNavbar from '../components/ResponsiveNavbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExploreIcon from '@mui/icons-material/Explore';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const FavoritesPage = () => {
  const { favorites } = useContext(MovieContext);
  const theme = useTheme();

  return (
    <PageWrapper>
      <ResponsiveNavbar />

      <Container sx={{ mt: { xs: 4, md: 6 }, mb: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <FavoriteIcon sx={{ color: theme.palette.secondary.main, fontSize: '2rem' }} />
          <Typography variant="h4" sx={{ fontWeight: 855 }}>
            Your Curated Shelf
          </Typography>
        </Box>

        {favorites.length > 0 ? (
          <Grid container spacing={{ xs: 2, sm: 3, md: 4.5 }} justifyContent="flex-start">
            {favorites.map(movie => (
              <Grid key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              p: 6,
              mt: 4,
              borderRadius: 5,
              backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(17, 24, 39, 0.45)',
              backdropFilter: 'blur(16px)',
              border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}`,
              boxShadow: theme.palette.mode === 'light' 
                ? '0 10px 30px -10px rgba(0,0,0,0.03)' 
                : '0 10px 40px -15px rgba(0,0,0,0.4)',
              maxWidth: 550,
              mx: 'auto'
            }}
          >
            <Typography variant="h1" sx={{ fontSize: '4.5rem', mb: 3, display: 'inline-block' }}>
              💖
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
              Your shelf is waiting to be filled
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 380, lineHeight: 1.6 }}>
              Curate your absolute favorite cinematic stories here! Browse trending blockbusters and click the heart icon on any card to add it to your shelf.
            </Typography>
            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<ExploreIcon />}
              sx={{ px: 4, py: 1.3 }}
            >
              Explore Releases
            </Button>
          </Box>
        )}
      </Container>
    </PageWrapper>
  );
};

export default FavoritesPage;
