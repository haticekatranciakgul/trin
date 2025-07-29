// Ana rota yolları
export const PATHS = {
  HOME: '/',
  NOT_FOUND: '*'
};

// Auth rota yolları
// export const AUTH_PATHS = {
//   LOGIN: '/login',
//   REGISTER: '/register'
// };

// Ana uygulama rota yolları
export const APP_PATHS = {
  DASHBOARD: '/dashboard',
  TRANSACTIONS: '/transactions',
  STATS: '/stats',
  ACCOUNTS: '/accounts',
  CATEGORIES: '/categories',
  MORE: '/more',
  GOLD_CHARTS: '/charts/gold',
};

// Kullanıcı rota yolları (gelecekte kullanım için)
export const USER_PATHS = {
  PROFILE: '/user/profile',
  SETTINGS: '/user/settings'
};

// Tüm rota yollarını birleştir
export const ALL_PATHS = {
  ...PATHS,
  ...APP_PATHS,
  ...USER_PATHS
}; 