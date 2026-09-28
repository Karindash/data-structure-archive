/**
 * Generate unique ID for scenarios
 */
export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
};

/**
 * Normalize string for comparison
 */
export const normalize = (str) => {
  return String(str || '').trim().toLowerCase();
};

/**
 * Escape HTML special characters
 */
export const escapeHtml = (str) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return String(str == null ? '' : str).replace(/[&<>"']/g, (c) => map[c]);
};

/**
 * Get unique sorted array
 */
export const uniqueSorted = (arr) => {
  return Array.from(new Set(arr.filter(Boolean))).sort();
};

/**
 * Parse CSV cell value (handle quotes and commas)
 */
export const csvCell = (value) => {
  const str = String(value == null ? '' : value);
  return /[",\n\r]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

/**
 * Generate timestamp for file naming
 */
export const timestamp = () => {
  return new Date().toISOString().slice(0, 10);
};
