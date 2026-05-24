import { useState, useContext } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Drawer,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Divider, useMediaQuery, Button, Badge,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { MovieContext } from '../context/MovieContext';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { motion, AnimatePresence } from 'framer-motion';

const MotionAppBar = motion.create(AppBar);
const MotionDrawer = motion.create(Box);

const ResponsiveNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { favorites, user, logout } = useContext(MovieContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const isActive = (path) => location.pathname === path;

  const handleOpenLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    logout();
    setLogoutDialogOpen(false);
    enqueueSnackbar('Logged out successfully!', { variant: 'info' });
  };

  const drawerContent = (
    <MotionDrawer
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      sx={{ 
        width: 260, 
        height: '100%',
        backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#0B0F19',
        color: theme.palette.text.primary,
        padding: 2,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, my: 2, px: 1 }}>
        <Typography variant="h5" sx={{ background: 'linear-gradient(45deg, #EC4899, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>
          🎬 MovieExplorer
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 2, opacity: 0.1 }} />

      <Box sx={{ px: 2, py: 1.5, mb: 2, borderRadius: 3, background: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)', border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}` }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 600 }}>
          CURRENT USER
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {user ? `👋 ${user.username}` : '👤 Guest User'}
        </Typography>
      </Box>

      <List sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/" 
            selected={isActive('/')}
            sx={{ 
              borderRadius: 3,
              '&.Mui-selected': {
                backgroundColor: theme.palette.nav.active,
                color: theme.palette.primary.main,
                '& .MuiListItemIcon-root': { color: theme.palette.primary.main }
              }
            }}
          >
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/favorites" 
            selected={isActive('/favorites')}
            sx={{ 
              borderRadius: 3,
              '&.Mui-selected': {
                backgroundColor: theme.palette.nav.active,
                color: theme.palette.primary.main,
                '& .MuiListItemIcon-root': { color: theme.palette.primary.main }
              }
            }}
          >
            <ListItemIcon>
              <Badge badgeContent={favorites.length} color="secondary">
                <FavoriteIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Favorites" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        </ListItem>

        {user ? (
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleOpenLogoutDialog}
              sx={{ 
                borderRadius: 3,
                color: theme.palette.error.main,
                '& .MuiListItemIcon-root': { color: theme.palette.error.main }
              }}
            >
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/login" 
              selected={isActive('/login')}
              sx={{ 
                borderRadius: 3,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.nav.active,
                  color: theme.palette.primary.main,
                  '& .MuiListItemIcon-root': { color: theme.palette.primary.main }
                }
              }}
            >
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary="Login" primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </MotionDrawer>
  );

  return (
    <Box sx={{ px: { xs: 1.5, md: 4 }, pt: { xs: 1.5, md: 3 }, width: '100%', boxSizing: 'border-box' }}>
      <MotionAppBar 
        position="static" 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        sx={{ 
          borderRadius: { xs: 4, md: 6 },
          background: theme.palette.nav.background,
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.06)'}`,
          boxShadow: theme.palette.mode === 'light' 
            ? '0 10px 30px -10px rgba(0,0,0,0.06)' 
            : '0 10px 40px -15px rgba(0,0,0,0.7)',
          overflow: 'hidden',
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1, px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {isMobile && (
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 0.5 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography 
              variant="h5" 
              component={Link} 
              to="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                fontWeight: 800, 
                textDecoration: 'none',
                background: 'linear-gradient(45deg, #EC4899, #8B5CF6)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}
            >
              🎬 MovieExplorer
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 4 }}>
              <Button
                component={Link}
                to="/"
                variant="text"
                sx={{ 
                  color: isActive('/') ? theme.palette.primary.main : theme.palette.text.secondary,
                  fontWeight: isActive('/') ? 700 : 500,
                  position: 'relative',
                  px: 2,
                  '&::after': isActive('/') ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 4,
                    left: 16,
                    right: 16,
                    height: '3px',
                    borderRadius: '2px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  } : {},
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.nav.hover
                  }
                }}
              >
                Home
              </Button>

              <Badge badgeContent={favorites.length} color="secondary" overlap="circular">
                <Button
                  component={Link}
                  to="/favorites"
                  variant="text"
                  sx={{ 
                    color: isActive('/favorites') ? theme.palette.primary.main : theme.palette.text.secondary,
                    fontWeight: isActive('/favorites') ? 700 : 500,
                    px: 2,
                    position: 'relative',
                    '&::after': isActive('/favorites') ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 4,
                      left: 16,
                      right: 16,
                      height: '3px',
                      borderRadius: '2px',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    } : {},
                    '&:hover': {
                      color: theme.palette.primary.main,
                      backgroundColor: theme.palette.nav.hover
                    }
                  }}
                  startIcon={<FavoriteIcon fontSize="small" />}
                >
                  Favorites
                </Button>
              </Badge>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto', mr: 1 }}>
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: theme.palette.text.secondary }}>
                  {user ? `👋 Hi, ${user.username}` : '👤 Guest'}
                </Typography>
              </Box>
            )}

            {!isMobile && (
              user ? (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleOpenLogoutDialog}
                  sx={{ 
                    px: 3, 
                    borderRadius: 8, 
                    fontWeight: 700,
                    borderWidth: '1.5px',
                    borderColor: 'rgba(239, 68, 68, 0.25)',
                    '&:hover': {
                      borderColor: theme.palette.error.main,
                      backgroundColor: 'rgba(239, 68, 68, 0.05)',
                      borderWidth: '1.5px',
                    }
                  }}
                  startIcon={<LogoutIcon fontSize="small" />}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  variant={isActive('/login') ? 'contained' : 'outlined'}
                  color="primary"
                  sx={{ px: 3, borderRadius: 8, fontWeight: 700 }}
                  startIcon={<LoginIcon fontSize="small" />}
                >
                  Login
                </Button>
              )
            )}

            <ThemeToggle />
          </Box>
        </Toolbar>
      </MotionAppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} PaperProps={{ sx: { background: 'transparent', boxShadow: 'none' } }}>
        <AnimatePresence>
          {drawerOpen && drawerContent}
        </AnimatePresence>
      </Drawer>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1.5,
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 0.9)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: theme.palette.mode === 'light' 
              ? '0 20px 40px -15px rgba(0,0,0,0.1)' 
              : '0 25px 50px -20px rgba(0,0,0,0.8)',
          }
        }}
      >
        <DialogTitle id="logout-dialog-title" sx={{ fontWeight: 800, pb: 1, fontFamily: "'Syne', sans-serif" }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
            Are you sure you want to log out of MovieExplorer? Your favorites will remain saved locally on this device.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={handleCloseLogoutDialog} variant="outlined" sx={{ px: 3 }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} variant="contained" color="error" sx={{ px: 3 }}>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResponsiveNavbar;
