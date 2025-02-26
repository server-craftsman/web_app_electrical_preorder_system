export const API_PATH = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    SOCIAL_LOGIN: '/auth/social-login',
    SOCIAL_LOGIN_CALLBACK: '/auth/social/callback',
  },
  PRODUCT: {
    GET_ALL: '/products',
    DETAIL: '/products/:id'
  },
  CATEGORY: {
    BASE: '/categories',
    UPDATE: '/categories/:id',
    DELETE: '/categories/:id',
  },
};
