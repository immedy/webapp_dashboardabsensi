// ==============================|| DATE UTILITY FUNCTIONS ||============================== //

/**
 * Format date to Indonesian format (DD/MM/YYYY)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Format date to Indonesian format with time
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date with time
 */
export const formatDateTime = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * Get days until expiration
 * @param {string|Date} expiryDate - Expiry date
 * @returns {number} Days remaining
 */
export const getDaysUntilExpiry = (expiryDate) => {
  if (!expiryDate) return null;
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Check if blood is expiring soon (within 3 days)
 * @param {string|Date} expiryDate - Expiry date
 * @returns {boolean} True if expiring soon
 */
export const isExpiringSoon = (expiryDate) => {
  const days = getDaysUntilExpiry(expiryDate);
  return days !== null && days >= 0 && days <= 3;
};

/**
 * Check if blood is expired
 * @param {string|Date} expiryDate - Expiry date
 * @returns {boolean} True if expired
 */
export const isExpired = (expiryDate) => {
  const days = getDaysUntilExpiry(expiryDate);
  return days !== null && days < 0;
};

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Today's date
 */
export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Add days to a date
 * @param {string|Date} date - Base date
 * @param {number} days - Number of days to add
 * @returns {string} New date in YYYY-MM-DD format
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split('T')[0];
};
