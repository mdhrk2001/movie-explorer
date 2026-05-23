import { useState, useContext } from 'react';
import {
  Container, TextField, Button, Typography, Card, CardContent, Box, Stack, InputAdornment
} from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import ResponsiveNavbar from '../components/ResponsiveNavbar';
import { useSnackbar } from 'notistack';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTheme } from '@mui/material/styles';

const MotionCard = motion.create(Card);

const LoginPage = () => {
  const { login } = useContext(MovieContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    let error = '';

    if (value.length < 3) {
      error = 'Username must be at least 3 characters';
    } else if (value.length > 10) {
      error = 'Username cannot exceed 10 characters';
    }

    setUsernameError(error);
    setUsername(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (usernameError || username.length < 3 || username.length > 10) {
      enqueueSnackbar('Please enter a valid username (3-10 characters)', { variant: 'error' });
      return;
    }

    const success = login(username, password);
    if (success) {
      enqueueSnackbar('Welcome back to Movie Explorer!', { variant: 'success' });
      navigate('/');
    } else {
      enqueueSnackbar('Invalid credentials!', { variant: 'error' });
    }
  };

  const isFormInvalid = !!usernameError || username.length < 3 || !password;

  return (
    <PageWrapper>
      <ResponsiveNavbar />

      <Box 
        sx={{ 
          position: 'relative', 
          minHeight: '80vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden',
          py: 4
        }}
      >
        {/* Cinematic Glowing Background Orbs */}
        <Box 
          sx={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
            top: '15%',
            left: '20%',
            zIndex: -1,
            filter: 'blur(40px)',
          }}
        />
        <Box 
          sx={{
            position: 'absolute',
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)',
            bottom: '15%',
            right: '15%',
            zIndex: -1,
            filter: 'blur(50px)',
          }}
        />

        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <MotionCard
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            sx={{ 
              padding: { xs: 2, sm: 4 }, 
              borderRadius: 6, 
              backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(17, 24, 39, 0.45)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}`,
              boxShadow: theme.palette.mode === 'light' 
                ? '0 20px 40px -15px rgba(0,0,0,0.08)' 
                : '0 25px 50px -20px rgba(0,0,0,0.8)',
            }}
          >
            <CardContent>
              <Typography 
                variant="h4" 
                align="center" 
                sx={{ 
                  mb: 1.5, 
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #EC4899, #8B5CF6)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome Back
              </Typography>
              <Typography 
                variant="body2" 
                align="center" 
                color="text.secondary" 
                sx={{ mb: 4, fontWeight: 500 }}
              >
                Log in to sync your curated favorite movies.
              </Typography>

              <form onSubmit={handleLogin}>
                <Stack spacing={3}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={handleUsernameChange}
                    error={!!usernameError}
                    helperText={usernameError}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlineIcon color="primary" sx={{ opacity: 0.7 }} />
                          </InputAdornment>
                        ),
                      }
                    }}
                  />

                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon color="primary" sx={{ opacity: 0.7 }} />
                          </InputAdornment>
                        ),
                      }
                    }}
                  />

                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isFormInvalid}
                      sx={{
                        width: '100%',
                        py: 1.6,
                        fontSize: '1rem',
                        borderRadius: 3.5,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                          boxShadow: theme.palette.mode === 'light'
                            ? '0 10px 25px rgba(99, 102, 241, 0.3)'
                            : '0 10px 25px rgba(139, 92, 246, 0.4)'
                        }
                      }}
                    >
                      Enter The Explorer
                    </Button>
                  </Box>
                </Stack>
              </form>
            </CardContent>
          </MotionCard>
        </Container>
      </Box>
    </PageWrapper>
  );
};

export default LoginPage;
