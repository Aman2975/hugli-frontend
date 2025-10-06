// Public Configuration for Frontend
// This file is accessible from the browser and can be modified on the server

window.APP_CONFIG = {
  // API Configuration
  API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:5000/api' 
    : window.location.protocol + '//' + window.location.hostname + '/api',
  
  // App Configuration
  APP_NAME: 'Hugli Printing Press',
  APP_VERSION: '1.0.0',
  
  // Environment
  NODE_ENV: 'production',
  
  // Contact Information
  CONTACT_EMAIL: 'amankachura2975@gmail.com',
  CONTACT_PHONE: '+91-9876543210',
  CONTACT_ADDRESS: 'Handiaya Bazaar Rd, Barnala, Punjab 148101',
  
  // Features
  ENABLE_ANALYTICS: false,
  ENABLE_DEBUG: false,
  ENABLE_PAYMENTS: false,
  ENABLE_ERROR_REPORTING: false,
  ENABLE_LAZY_LOADING: true,
  ENABLE_SERVICE_WORKER: false,
  ENABLE_HTTPS_REDIRECT: false,
  
  // File Upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: 'image/jpeg,image/png,image/gif,application/pdf',
  
  // Cache Configuration
  CACHE_DURATION: 300000, // 5 minutes
  SESSION_TIMEOUT: 3600000, // 1 hour
  
  // Social Media
  FACEBOOK_URL: '',
  INSTAGRAM_URL: '',
  TWITTER_URL: '',
  
  // Payment Configuration
  PAYMENT_GATEWAY: 'razorpay',
  
  // Error Reporting
  ERROR_REPORTING_URL: ''
};

// Log configuration in development
if (window.APP_CONFIG.ENABLE_DEBUG) {
  console.log('🔧 Public Configuration loaded:', window.APP_CONFIG);
}
