import { useState, useContext } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Drawer,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Divider, useMediaQuery, Button, Badge
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

const ResponsiveNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { favorites, user, logout } = useContext(MovieContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    enqueueSnackbar('Logged out successfully!', { variant: 'info' });
  };

  const drawerContent = (
    <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
      <Typography variant="h6" sx={{ m: 2, fontWeight: 'bold' }}>Movie Explorer</Typography>
      
      <Divider />

      <ListItem>
        <ListItemText
          primary={`👋 Welcome, ${user ? user.username : 'User'}`}
          sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}
        />
      </ListItem>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" selected={isActive('/')}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/favorites" selected={isActive('/favorites')}>
            <ListItemIcon>
              <Badge badgeContent={favorites.length} color="success">
                <FavoriteIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItemButton>
        </ListItem>

        {user ? (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/login" selected={isActive('/login')}>
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="default" elevation={2}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile ? (
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Typography variant="h5" sx={{ mr: 1 }}>🎬</Typography>
            )}
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Movie Explorer</Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
              {user ? (
              <Typography sx={{ ml: 1, fontWeight: 'bold', fontSize: '0.9rem' }}>
                👋 Welcome, {user.username}
              </Typography>
              ) : (
                <Typography sx={{ ml: 1, fontWeight: 'bold', fontSize: '0.9rem' }}>
                  👋 Welcome, User
                </Typography>
              )}
            </Box>
          )}

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
              <Button
                component={Link}
                to="/"
                variant={isActive('/') ? 'contained' : 'outlined'}
                color="primary"
                sx={{ textTransform: 'none', borderRadius: 20 }}
              >
                Home
              </Button>

              <Badge badgeContent={favorites.length} color="success">
                <Button
                  component={Link}
                  to="/favorites"
                  variant={isActive('/favorites') ? 'contained' : 'outlined'}
                  color="primary"
                  sx={{ textTransform: 'none', borderRadius: 20 }}
                  startIcon={<FavoriteIcon />}
                >
                  Favorites
                </Button>
              </Badge>

              {user ? (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleLogout}
                  sx={{ textTransform: 'none', borderRadius: 20 }}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  variant={isActive('/login') ? 'contained' : 'outlined'}
                  color="primary"
                  sx={{ textTransform: 'none', borderRadius: 20 }}
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
              )}
            </Box>
          )}

          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default ResponsiveNavbar;
