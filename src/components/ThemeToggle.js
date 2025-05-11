import { useContext } from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { MovieContext } from '../context/MovieContext';

const ThemeToggle = () => {
  const { themeMode, toggleTheme } = useContext(MovieContext);

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggle;