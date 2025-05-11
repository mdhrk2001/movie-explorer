import { useContext } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import PageWrapper from '../components/PageWrapper';
import ResponsiveNavbar from '../components/ResponsiveNavbar';

const FavoritesPage = () => {
  const { favorites } = useContext(MovieContext);

  return (
    <PageWrapper>
      <ResponsiveNavbar />

      <Container sx={{ mt: { xs: 2, md: 4 }, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Your Favorite Movies
        </Typography>

        {favorites.length > 0 ? (
          <Grid container spacing={4} justifyContent="center">
            {favorites.map(movie => (
              <Grid item key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography sx={{ mt: 2 }}>You haven't added any favorites yet.</Typography>
        )}
      </Container>
    </PageWrapper>
  );
};

export default FavoritesPage;
