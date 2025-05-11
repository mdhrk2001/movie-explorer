import { useEffect, useState } from 'react';
import {
  Container, Typography, Chip, Grid, Card, CardMedia, Avatar, Box, Stack, Skeleton
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/tmdb';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import ResponsiveNavbar from '../components/ResponsiveNavbar';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PROFILE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

const DetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id)
      .then(res => setMovie(res.data))
      .catch(err => console.error('Error fetching details:', err));
  }, [id]);

  if (!movie) {
    return (
      <Container sx={{ mt: 4 }}>
        <Skeleton variant="rectangular" height={400} />
        <Skeleton variant="text" sx={{ mt: 2 }} />
        <Skeleton variant="text" width="60%" />
      </Container>
    );
  }

  const trailer = movie.videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;

  const topCast = movie.credits?.cast.slice(0, 5) || [];

  return (
    <PageWrapper>
      <ResponsiveNavbar />

      <Container sx={{ mt: { xs: 2, md: 4 }, mb: 4 }}>
        <Grid container spacing={4} alignItems="flex-start">
          {/* Poster + Info */}
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                  alt={movie.title}
                />
              </Card>
            </motion.div>

            <Typography variant="h6" sx={{ mt: 2 }}>
              <strong>Genres:</strong>
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
              {movie.genres.map(genre => (
                <Chip key={genre.id} label={genre.name} />
              ))}
            </Stack>

            <Typography variant="h6" sx={{ mt: 3 }}>
              <strong>Release Date:</strong>
            </Typography>
            <Typography variant="body2">{movie.release_date}</Typography>

            <Typography variant="h6" sx={{ mt: 3 }}>
              <strong>Rating:</strong>
            </Typography>
            <Typography variant="body2">⭐ {movie.vote_average.toFixed(1)}</Typography>
          </Grid>

          {/* Overview + Trailer + Cast */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              {movie.title}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {movie.overview}
            </Typography>

            {trailerUrl && (
              <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 4 }}>
                <iframe
                  src={trailerUrl}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px',
                  }}
                ></iframe>
              </Box>
            )}

            <Typography variant="h6" sx={{ mb: 2 }}>
              <strong>Top Cast:</strong>
            </Typography>

            <Grid container spacing={2}>
              {topCast.map(actor => (
                <Grid item key={actor.id} xs={4} sm={3} md={2}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Avatar
                      src={
                        actor.profile_path
                          ? `${PROFILE_BASE_URL}${actor.profile_path}`
                          : 'https://via.placeholder.com/150x225?text=No+Image'
                      }
                      alt={actor.name}
                      sx={{ width: 100, height: 140, margin: '0 auto', mb: 1 }}
                    />
                    <Typography variant="body2" noWrap>{actor.name}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
};

export default DetailsPage;