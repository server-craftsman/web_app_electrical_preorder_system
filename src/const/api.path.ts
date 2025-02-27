export const API_PATH = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    SOCIAL_LOGIN: '/auth/social-login',
    SOCIAL_LOGIN_CALLBACK: '/auth/social/callback',
  },
  PRODUCT: {
    GET_ALL: '/products',
    GET_BY_ID: '/products/:id',
    GET_BY_SLUG: '/products/:slug',
    UPDATE: '/products/:id',
  },
  CATEGORY: {
    BASE: '/categories',
    UPDATE: '/categories/:id',
    DELETE: '/categories/:id',
  },
};
