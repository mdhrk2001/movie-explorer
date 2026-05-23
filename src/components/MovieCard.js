import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const MotionCard = motion.create(Card);
const MotionIconButton = motion.create(IconButton);

const MovieCard = ({ movie }) => {
  const { addFavorite, favorites, removeFavorite, isAuthenticated } = useContext(MovieContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const handleFavorite = (e) => {
    e.preventDefault(); // Stop navigation to details
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    isFavorite ? removeFavorite(movie.id) : addFavorite(movie);
  };

  const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null;

  return (
    <MotionCard
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      sx={{
        width: { xs: 160, sm: 200 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: 4,
        background: theme.palette.mode === 'light' ? '#FFFFFF' : '#0B0F19',
        boxShadow: theme.palette.mode === 'light'
          ? '0 10px 25px -10px rgba(0,0,0,0.08), 0 4px 10px -5px rgba(0,0,0,0.04)'
          : '0 15px 35px -15px rgba(0,0,0,0.6), 0 5px 15px -5px rgba(0,0,0,0.4)',
        '&:hover': {
          boxShadow: theme.palette.mode === 'light'
            ? '0 20px 30px -10px rgba(99, 102, 241, 0.2)'
            : '0 25px 40px -15px rgba(139, 92, 246, 0.35)',
          '& .movie-poster': {
            transform: 'scale(1.08)',
          },
          '& .movie-overlay': {
            opacity: 1,
          }
        }
      }}
    >
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ position: 'relative', overflow: 'hidden', pt: '140%', width: '100%' }}>
          {/* Movie Poster */}
          {posterUrl ? (
            <CardMedia
              component="img"
              image={posterUrl}
              alt={movie.title}
              className="movie-poster"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          ) : (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: theme.palette.mode === 'light' ? '#E2E8F0' : '#1F2937',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 2,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {movie.title}
              </Typography>
            </Box>
          )}

          {/* Frosted Rating Tag */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 2,
              px: 1.2,
              py: 0.5,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              background: 'rgba(3, 7, 18, 0.65)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#FBBF24', display: 'flex', alignItems: 'center' }}>
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </Typography>
          </Box>

          {/* Ambient Fade overlay */}
          <Box
            className="movie-overlay"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              background: 'linear-gradient(to top, rgba(3, 7, 18, 0.9) 0%, rgba(3, 7, 18, 0.3) 50%, transparent 100%)',
              zIndex: 1,
              opacity: 0.85,
              transition: 'opacity 0.3s ease',
            }}
          />

          {/* Quick Favorite Button */}
          <Box sx={{ position: 'absolute', bottom: 12, right: 12, zIndex: 3 }}>
            <MotionIconButton
              onClick={handleFavorite}
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1 }}
              sx={{
                background: isFavorite 
                  ? 'rgba(236, 72, 153, 0.9)' 
                  : 'rgba(3, 7, 18, 0.5)',
                backdropFilter: 'blur(6px)',
                border: isFavorite
                  ? '1px solid rgba(236, 72, 153, 0.2)'
                  : '1px solid rgba(255, 255, 255, 0.15)',
                color: isFavorite ? '#ffffff' : '#ffffff',
                boxShadow: isFavorite ? '0 4px 15px rgba(236, 72, 153, 0.4)' : 'none',
                width: 38,
                height: 38,
                '&:hover': {
                  background: isFavorite 
                    ? 'rgba(219, 39, 119, 1)' 
                    : 'rgba(99, 102, 241, 0.9)',
                }
              }}
            >
              {isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            </MotionIconButton>
          </Box>
        </Box>

        <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography
            variant="subtitle1"
            noWrap
            sx={{
              fontWeight: 700,
              fontSize: { xs: '0.9rem', sm: '0.95rem' },
              color: theme.palette.text.primary,
              mb: 0.5
            }}
          >
            {movie.title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
              color: theme.palette.text.secondary,
              fontSize: '0.75rem'
            }}
          >
            {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'} • Popularity: {Math.round(movie.popularity)}
          </Typography>
        </CardContent>
      </Link>
    </MotionCard>
  );
};

export default MovieCard;