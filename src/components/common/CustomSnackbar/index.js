import React from 'react';
import { Snackbar, Alert } from '@mui/material';

/**
 * Reusable Snackbar Component
 * @param {boolean} open - Snackbar görünürlük durumu
 * @param {string} message - Gösterilecek mesaj
 * @param {string} severity - Alert tipi ('success', 'error', 'warning', 'info')
 * @param {function} onClose - Snackbar kapatma fonksiyonu
 * @param {number} autoHideDuration - Otomatik kapanma süresi (ms)
 * @param {object} position - Snackbar pozisyonu
 */
const CustomSnackbar = ({ 
  open, 
  message, 
  severity = 'success', 
  onClose,
  autoHideDuration = 4000,
  position = { vertical: 'top', horizontal: 'right' }
}) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={position}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant="filled"
        sx={{ 
          width: '100%', 
          minWidth: '300px',
          fontWeight: 700,
          fontSize: '0.875rem'
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
