import { useState, useCallback } from 'react';

/**
 * Custom hook for managing Snackbar state with helper methods
 * @returns {Object} Hook object with snackbar state and functions
 */
export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success', 'error', 'warning', 'info'
  });

  /**
   * Show snackbar with message and severity
   * @param {string} message - Message to display
   * @param {string} severity - Severity type ('success', 'error', 'warning', 'info')
   */
  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({ 
      open: true, 
      message, 
      severity 
    });
  }, []);

  /**
   * Show success snackbar
   * @param {string} message - Success message to display
   */
  const showSuccess = useCallback((message) => {
    showSnackbar(message, 'success');
  }, [showSnackbar]);

  /**
   * Show error snackbar
   * @param {string} message - Error message to display
   */
  const showError = useCallback((message) => {
    showSnackbar(message, 'error');
  }, [showSnackbar]);

  /**
   * Show warning snackbar
   * @param {string} message - Warning message to display
   */
  const showWarning = useCallback((message) => {
    showSnackbar(message, 'warning');
  }, [showSnackbar]);

  /**
   * Show info snackbar
   * @param {string} message - Info message to display
   */
  const showInfo = useCallback((message) => {
    showSnackbar(message, 'info');
  }, [showSnackbar]);

  /**
   * Close the snackbar
   */
  const closeSnackbar = useCallback(() => {
    setSnackbar(prev => ({ 
      ...prev, 
      open: false 
    }));
  }, []);

  return { 
    snackbar, 
    showSnackbar,
    showSuccess,
    showError, 
    showWarning,
    showInfo,
    close: closeSnackbar 
  };
};

export default useSnackbar;
