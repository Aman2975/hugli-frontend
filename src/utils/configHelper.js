// Configuration Helper Utilities
// This file provides utilities for working with configuration in the frontend

import config from '../config';

// Get API URL with fallback
export const getApiUrl = () => {
  return config.API_BASE_URL;
};

// Get app name
export const getAppName = () => {
  return config.APP_NAME;
};

// Get contact information
export const getContactInfo = () => {
  return {
    email: config.CONTACT_EMAIL,
    phone: config.CONTACT_PHONE,
    address: config.CONTACT_ADDRESS
  };
};

// Check if feature is enabled
export const isFeatureEnabled = (feature) => {
  const featureMap = {
    analytics: config.ENABLE_ANALYTICS,
    debug: config.ENABLE_DEBUG,
    payments: config.ENABLE_PAYMENTS,
    errorReporting: config.ENABLE_ERROR_REPORTING,
    lazyLoading: config.ENABLE_LAZY_LOADING,
    serviceWorker: config.ENABLE_SERVICE_WORKER,
    httpsRedirect: config.ENABLE_HTTPS_REDIRECT
  };
  
  return featureMap[feature] || false;
};

// Get file upload limits
export const getFileUploadLimits = () => {
  return {
    maxSize: config.MAX_FILE_SIZE,
    allowedTypes: config.ALLOWED_FILE_TYPES.split(',').map(type => type.trim())
  };
};

// Get cache duration
export const getCacheDuration = () => {
  return config.CACHE_DURATION;
};

// Get session timeout
export const getSessionTimeout = () => {
  return config.SESSION_TIMEOUT;
};

// Check if we're in development mode
export const isDevelopment = () => {
  return config.NODE_ENV === 'development';
};

// Check if we're in production mode
export const isProduction = () => {
  return config.NODE_ENV === 'production';
};

// Get social media URLs
export const getSocialMediaUrls = () => {
  return {
    facebook: config.FACEBOOK_URL,
    instagram: config.INSTAGRAM_URL,
    twitter: config.TWITTER_URL
  };
};

// Get payment configuration
export const getPaymentConfig = () => {
  return {
    enabled: config.ENABLE_PAYMENTS,
    gateway: config.PAYMENT_GATEWAY
  };
};

// Log configuration (only in development or debug mode)
export const logConfig = () => {
  if (isDevelopment() || isFeatureEnabled('debug')) {
    // Configuration loaded silently
  }
};

// Validate configuration
export const validateConfig = () => {
  const errors = [];
  
  if (!config.API_BASE_URL) {
    errors.push('API_BASE_URL is required');
  }
  
  if (!config.APP_NAME) {
    errors.push('APP_NAME is required');
  }
  
  if (errors.length > 0) {
    return false;
  }
  
  return true;
};

// Get environment-specific configuration
export const getEnvironmentConfig = () => {
  const baseConfig = {
    apiUrl: getApiUrl(),
    appName: getAppName(),
    contactInfo: getContactInfo(),
    features: {
      analytics: isFeatureEnabled('analytics'),
      debug: isFeatureEnabled('debug'),
      payments: isFeatureEnabled('payments'),
      errorReporting: isFeatureEnabled('errorReporting'),
      lazyLoading: isFeatureEnabled('lazyLoading'),
      serviceWorker: isFeatureEnabled('serviceWorker'),
      httpsRedirect: isFeatureEnabled('httpsRedirect')
    },
    fileUpload: getFileUploadLimits(),
    cache: {
      duration: getCacheDuration(),
      sessionTimeout: getSessionTimeout()
    },
    socialMedia: getSocialMediaUrls(),
    payment: getPaymentConfig(),
    environment: {
      isDevelopment: isDevelopment(),
      isProduction: isProduction(),
      nodeEnv: config.NODE_ENV
    }
  };
  
  return baseConfig;
};

export default {
  getApiUrl,
  getAppName,
  getContactInfo,
  isFeatureEnabled,
  getFileUploadLimits,
  getCacheDuration,
  getSessionTimeout,
  isDevelopment,
  isProduction,
  getSocialMediaUrls,
  getPaymentConfig,
  logConfig,
  validateConfig,
  getEnvironmentConfig
};
