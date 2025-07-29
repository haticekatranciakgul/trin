// Environment configuration helper
const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'https://darbetigh-fintech-budget-fa52f728dbb5.herokuapp.com/api/v1',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,
  },
  // App Configuration
  app: {
    name: process.env.REACT_APP_APP_NAME || 'Budget Tracker',
    version: process.env.REACT_APP_VERSION || '1.0.0',
    environment: process.env.REACT_APP_ENVIRONMENT || 'development',
  },
  // Feature Flags
  features: {
    enableMockAPI: process.env.REACT_APP_ENABLE_MOCK_API === 'true',
    enableDebugMode: process.env.REACT_APP_ENABLE_DEBUG_MODE === 'true',
    csrfProtection: process.env.REACT_APP_CSRF_PROTECTION === 'true',
  },
  // Development helpers
  isDevelopment: () => process.env.REACT_APP_ENVIRONMENT === 'development',
  isProduction: () => process.env.REACT_APP_ENVIRONMENT === 'production',
  // Debug helper
  log: (...args) => {
    if (process.env.REACT_APP_ENABLE_DEBUG_MODE === 'true') {
      console.log('[Config Debug]:', ...args);
    }
  },
};
export default config;
