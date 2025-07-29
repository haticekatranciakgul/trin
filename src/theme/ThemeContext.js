import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Update CSS variables based on theme
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--background-color', '#121212');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--card-background', '#1e1e1e');
      root.style.setProperty('--primary-color', '#90caf9');
      root.style.setProperty('--success-color', '#4caf50');
      root.style.setProperty('--error-color', '#f44336');
    } else {
      root.style.setProperty('--background-color', '#f5f5f5');
      root.style.setProperty('--text-color', 'rgba(0, 0, 0, 0.87)');
      root.style.setProperty('--card-background', '#ffffff');
      root.style.setProperty('--primary-color', '#1976d2');
      root.style.setProperty('--success-color', '#27ae60');
      root.style.setProperty('--error-color', '#e74c3c');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeContext }; 