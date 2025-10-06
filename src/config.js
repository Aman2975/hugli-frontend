// Frontend Configuration
// Simple configuration file - edit values below

const config = {
  // API Configuration
  API_BASE_URL: 'http://localhost:5000/api',
  
  // App Information
  APP_NAME: 'Hugli Printing Press',
  APP_VERSION: '1.0.0',
  
  // Contact Information
  CONTACT_EMAIL: 'bhavnishgarg94@gmail.com',
  CONTACT_PHONE: '+91-7837315102',
  CONTACT_ADDRESS: 'Handiaya Bazaar Rd, Barnala, Punjab 148101',
  
  // Features
  ENABLE_ANALYTICS: false,
  ENABLE_DEBUG: false,
  
  // Social Media Links
  FACEBOOK_URL: '',
  INSTAGRAM_URL: '',
  TWITTER_URL: '',
  
  // File Upload Settings
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: 'image/jpeg,image/png,image/gif,application/pdf',
  
  // Other Settings
  SESSION_TIMEOUT: 3600000, // 1 hour in milliseconds
};

export default config;
