// ==============================|| ERROR HANDLER UTILITY ||============================== //

import { toast } from 'react-toastify';

/**
 * Handle API errors with consistent toast messages
 * @param {Error} error - The error object
 * @param {string} customMessage - Optional custom message
 */
export const handleApiError = (error, customMessage) => {
  const message = error.response?.data?.message || error.message || customMessage || 'Terjadi kesalahan';
  toast.error(message);
  console.error('API Error:', error);
};

/**
 * Show success message
 * @param {string} message - Success message
 */
export const showSuccess = (message) => {
  toast.success(message);
};

/**
 * Show info message
 * @param {string} message - Info message
 */
export const showInfo = (message) => {
  toast.info(message);
};

/**
 * Show warning message
 * @param {string} message - Warning message
 */
export const showWarning = (message) => {
  toast.warning(message);
};
