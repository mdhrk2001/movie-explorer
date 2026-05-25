import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MovieIcon from '@mui/icons-material/Movie';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const MotionBox = motion.create(Box);
const MotionIconButton = motion.create(IconButton);

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      sx={{
        mt: 'auto',
        background: theme.palette.nav.background,
        backdropFilter: 'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        borderTop: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
        color: theme.palette.text.primary,
        py: 6,
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand & Description Column */}
          <Grid xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 800,
                background: 'linear-gradient(45deg, #EC4899, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                mb: 2,
              }}
            >
              🎬 MovieExplorer
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 320, lineHeight: 1.6 }}>
              Your ultimate cinematic visual vault. Explore trending theatrical titles, search detailed synopsis information, and organize your favorite lists in style.
            </Typography>
            {/* Social Icons */}
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <MotionIconButton
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                target="_blank"
                sx={{ color: theme.palette.text.secondary }}
              >
                <GitHubIcon fontSize="small" />
              </MotionIconButton>
              <MotionIconButton
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://twitter.com"
                target="_blank"
                sx={{ color: theme.palette.text.secondary }}
              >
                <TwitterIcon fontSize="small" />
              </MotionIconButton>
              <MotionIconButton
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com"
                target="_blank"
                sx={{ color: theme.palette.text.secondary }}
              >
                <InstagramIcon fontSize="small" />
              </MotionIconButton>
            </Box>
          </Grid>

          {/* Quick Links Column */}
          <Grid xs={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, letterSpacing: '0.05em', color: theme.palette.primary.main }}>
              NAVIGATION
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s', '&:hover': { color: theme.palette.primary.main } }}>
                Explore Releases
              </Link>
              <Link component={RouterLink} to="/favorites" color="inherit" underline="none" sx={{ fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s', '&:hover': { color: theme.palette.primary.main } }}>
                Curated Favorites
              </Link>
              <Link component={RouterLink} to="/login" color="inherit" underline="none" sx={{ fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s', '&:hover': { color: theme.palette.primary.main } }}>
                User Portal Account
              </Link>
            </Box>
          </Grid>

          {/* API Attribution Column */}
          <Grid xs={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, letterSpacing: '0.05em', color: theme.palette.primary.main }}>
              DATA SOURCE
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
              This product uses the TMDb API but is not endorsed or certified by TMDb.
            </Typography>
            <Link
              href="https://www.themoviedb.org"
              target="_blank"
              underline="none"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
                color: theme.palette.secondary.main,
                gap: 0.5,
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.8 }
              }}
            >
              <MovieIcon fontSize="small" />
              Visit themoviedb.org
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, opacity: 0.08 }} />

        {/* Footer Bottom copyright and heart attribution */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            &copy; {currentYear} MovieExplorer. All cinematic content is properties of their respective owners.
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontWeight: 600,
              color: theme.palette.text.secondary
            }}
          >
            Crafted with <FavoriteIcon sx={{ fontSize: 13, color: '#EC4899' }} /> for film enthusiasts
          </Typography>
        </Box>
      </Container>
    </MotionBox>
  );
};

export default Footer;
