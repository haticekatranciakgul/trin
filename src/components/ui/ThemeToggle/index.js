import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../../../theme/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} data-testid="theme-tooltip">
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label="toggle theme"
      >
        {isDarkMode ? (
          <Brightness7Icon data-testid="light-icon" />
        ) : (
          <Brightness4Icon data-testid="dark-icon" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle; 