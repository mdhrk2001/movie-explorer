import { useState, useContext } from 'react';
import {
  Container, TextField, Button, Typography, Card, CardContent, Box
} from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import ResponsiveNavbar from '../components/ResponsiveNavbar';
import { useSnackbar } from 'notistack';

const MotionCard = motion(Card);

const LoginPage = () => {
  const { login } = useContext(MovieContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const navigate = useNavigate();

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
      enqueueSnackbar('Login successful!', { variant: 'success' });
      navigate('/');
    } else {
      enqueueSnackbar('Invalid credentials!', { variant: 'error' });
    }
  };

  const isFormInvalid = !!usernameError || username.length < 3 || !password;

  return (
    <PageWrapper>
      <ResponsiveNavbar />

      <Container sx={{ mt: { xs: 4, md: 6 }, mb: 4 }} maxWidth="sm">
        <MotionCard
          whileHover={{ scale: 1.02 }}
          sx={{ padding: 3, borderRadius: 3, boxShadow: 4 }}
        >
          <CardContent>
            <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
              Login to Movie Explorer
            </Typography>

            <form onSubmit={handleLogin}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={username}
                onChange={handleUsernameChange}
                error={!!usernameError}
                helperText={usernameError}
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isFormInvalid}
                >
                  Login
                </Button>
              </Box>
            </form>
          </CardContent>
        </MotionCard>
      </Container>
    </PageWrapper>
  );
};

export default LoginPage;
