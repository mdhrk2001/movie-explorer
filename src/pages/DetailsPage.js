import { useEffect, useState } from 'react';
import {
  Container, Typography, Chip, Grid, Card, CardMedia, Avatar, Box, Stack, Skeleton, Button
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../api/tmdb';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import ResponsiveNavbar from '../components/ResponsiveNavbar';
import Footer from '../components/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useTheme } from '@mui/material/styles';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';
const PROFILE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

const DetailsPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [movie, setMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    getMovieDetails(id)
      .then(res => {
        setMovie(res.data);
        window.scrollTo(0, 0);
      })
      .catch(err => console.error('Error fetching details:', err));
  }, [id]);

  if (!movie) {
    return (
      <PageWrapper>
        <ResponsiveNavbar />
        <Container sx={{ mt: 6 }}>
          <Grid container spacing={4}>
            <Grid xs={12} md={4}>
              <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 6 }} />
            </Grid>
            <Grid xs={12} md={8}>
              <Skeleton variant="text" width="80%" height={60} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="40%" height={30} sx={{ mb: 4 }} />
              <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 4, mb: 4 }} />
              <Skeleton variant="text" width="60%" height={30} />
            </Grid>
          </Grid>
        </Container>
      </PageWrapper>
    );
  }

  const trailer = movie.videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1` : null;
  const topCast = movie.credits?.cast.slice(0, 6) || [];
  
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  const backdropUrl = movie.backdrop_path ? `${BACKDROP_BASE_URL}${movie.backdrop_path}` : null;

  return (
    <PageWrapper>
      <ResponsiveNavbar />

      {backdropUrl && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '550px',
            zIndex: -1,
            backgroundImage: `url(${backdropUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 15%',
            filter: 'blur(30px) brightness(0.35)',
            transform: 'scale(1.1)',
            opacity: theme.palette.mode === 'light' ? 0.35 : 0.6,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '100%',
              background: theme.palette.mode === 'light' 
                ? 'linear-gradient(to bottom, transparent 30%, #F8FAFC 100%)'
                : 'linear-gradient(to bottom, transparent 30%, #030712 100%)',
            }
          }}
        />
      )}

      <Container sx={{ mt: { xs: 3, md: 6 }, mb: 8, position: 'relative' }}>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ 
            mb: 4, 
            color: theme.palette.text.primary,
            background: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(17,24,39,0.5)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}`,
            px: 2.5,
            py: 1,
            borderRadius: 3,
            '&:hover': {
              background: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.95)' : 'rgba(17,24,39,0.85)',
            }
          }}
        >
          Back to list
        </Button>

        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
          <Grid xs={12} md={4}>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card 
                sx={{ 
                  borderRadius: 6, 
                  boxShadow: theme.palette.mode === 'light'
                    ? '0 20px 45px -10px rgba(0,0,0,0.15)'
                    : '0 25px 60px -15px rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  overflow: 'hidden'
                }}
              >
                <CardMedia
                  component="img"
                  image={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster+Found'}
                  alt={movie.title}
                  sx={{ width: '100%', objectFit: 'cover' }}
                />
              </Card>
            </motion.div>
          </Grid>

          <Grid xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.1, fontSize: { xs: '2.25rem', md: '3.25rem' } }}>
                {movie.title}
              </Typography>
              {movie.tagline && (
                <Typography variant="h6" color="secondary" sx={{ fontWeight: 600, fontStyle: 'italic', mb: 3, opacity: 0.9 }}>
                  "{movie.tagline}"
                </Typography>
              )}

              <Stack direction="row" spacing={3} sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <StarIcon color="warning" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    {movie.vote_average.toFixed(1)} / 10
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: theme.palette.text.secondary }}>
                  <CalendarTodayIcon fontSize="small" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: theme.palette.text.secondary }}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {formatRuntime(movie.runtime)}
                  </Typography>
                </Box>
              </Stack>

              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
                Genre Categories
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mb: 4 }}>
                {movie.genres.map(genre => (
                  <Chip 
                    key={genre.id} 
                    label={genre.name} 
                    sx={{ 
                      px: 1,
                      py: 2,
                      fontWeight: 700, 
                      borderRadius: 3, 
                      backgroundColor: theme.palette.mode === 'light' ? 'rgba(99,102,241,0.08)' : 'rgba(139,92,246,0.12)',
                      border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(99,102,241,0.15)' : 'rgba(139,92,246,0.2)'}`,
                      color: theme.palette.primary.main 
                    }} 
                  />
                ))}
              </Stack>

              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
                Synopsis
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: theme.palette.text.secondary, fontSize: '1.05rem', lineHeight: 1.7 }}>
                {movie.overview || "No overview available for this release."}
              </Typography>

              {trailerUrl && (
                <Box sx={{ mb: 5 }}>
                  {!showTrailer ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      startIcon={<PlayArrowIcon />}
                      onClick={() => setShowTrailer(true)}
                      sx={{ 
                        px: 4, 
                        py: 1.8, 
                        borderRadius: 4, 
                        fontSize: '1rem',
                        background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
                        boxShadow: '0 10px 25px rgba(236,72,153,0.4)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)',
                          boxShadow: '0 12px 30px rgba(236,72,153,0.5)',
                        }
                      }}
                    >
                      Watch Theatrical Trailer
                    </Button>
                  ) : (
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          Official Trailer
                        </Typography>
                        <Button size="small" color="secondary" onClick={() => setShowTrailer(false)} sx={{ fontWeight: 700 }}>
                          Close Theater
                        </Button>
                      </Box>
                      <Box 
                        sx={{ 
                          position: 'relative', 
                          paddingTop: '56.25%', 
                          borderRadius: 5, 
                          overflow: 'hidden', 
                          border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'}`,
                          boxShadow: theme.palette.mode === 'light'
                            ? '0 15px 30px rgba(0,0,0,0.15)'
                            : '0 20px 50px rgba(139,92,246,0.3)',
                        }}
                      >
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
                          }}
                        ></iframe>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}

              {topCast.length > 0 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2.5, fontWeight: 700 }}>
                    Top Billed Cast
                  </Typography>

                  <Grid container spacing={3.5}>
                    {topCast.map(actor => (
                      <Grid key={actor.id} xs={6} sm={4} md={2}>
                        <motion.div
                          whileHover={{ y: -6 }}
                          transition={{ duration: 0.25 }}
                        >
                          <Box sx={{ textAlign: 'center' }}>
                            <Avatar
                              src={actor.profile_path ? `${PROFILE_BASE_URL}${actor.profile_path}` : null}
                              alt={actor.name}
                              sx={{ 
                                width: 90, 
                                height: 90, 
                                margin: '0 auto', 
                                mb: 1.5,
                                border: `3px solid ${theme.palette.mode === 'light' ? '#FFFFFF' : '#111827'}`,
                                boxShadow: theme.palette.mode === 'light'
                                  ? '0 4px 15px rgba(0,0,0,0.08)'
                                  : '0 6px 20px rgba(0,0,0,0.6)',
                              }}
                            >
                              {actor.name.charAt(0)}
                            </Avatar>
                            <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                              {actor.name}
                            </Typography>
                            <Typography variant="caption" noWrap sx={{ display: 'block', color: 'text.secondary', fontSize: '0.75rem' }}>
                              {actor.character}
                            </Typography>
                          </Box>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default DetailsPage;