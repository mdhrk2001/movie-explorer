import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { motion } from 'framer-motion';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const MotionCard = motion(Card);

const MovieCard = ({ movie }) => {
  const { addFavorite, favorites, removeFavorite, isAuthenticated } = useContext(MovieContext);
  const navigate = useNavigate();
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const handleFavorite = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    isFavorite ? removeFavorite(movie.id) : addFavorite(movie);
  };

  const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null;

  return (
    <MotionCard
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      sx={{
        maxWidth: 200,
        borderRadius: 3,
        boxShadow: 3,
        transition: 'transform 0.2s',
      }}
    >
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {posterUrl ? (
          <CardMedia
            component="img"
            image={posterUrl}
            alt={movie.title}
            sx={{ height: 280, width: 200, objectFit: 'cover' }}
          />
        ) : (
          <Box
            sx={{
              height: 280,
              width: 200,
              backgroundColor: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: 1,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {movie.title}
            </Typography>
          </Box>
        )}

        <CardContent>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>{movie.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.release_date?.substring(0, 4)} | ⭐ {movie.vote_average.toFixed(1)}
          </Typography>
        </CardContent>
      </Link>

      <Box sx={{ textAlign: 'right', pr: 1, pb: 1, mt: -4 }}>
        <IconButton onClick={handleFavorite} color={isFavorite ? 'error' : 'default'}>
          <FavoriteIcon />
        </IconButton>
      </Box>
    </MotionCard>
  );
};

export default MovieCard;