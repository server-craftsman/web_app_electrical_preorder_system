export const API_PATH = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    SOCIAL_LOGIN: '/auth/social-login',
    SOCIAL_LOGIN_CALLBACK: '/auth/social/callback',
  },
  USER: {
    GET_ALL: '/users',
    CREATE: '/users/sign-up',
    VERIFY_TOKEN: '/users/verify',
  },
  PRODUCT: {
    GET_ALL: '/products',
    GET_BY_ID: '/products/:id',
    GET_BY_SLUG: '/products/:slug',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
    DELETE_MULTIPLE: '/products',
  },
  CATEGORY: {
    BASE: '/categories',
    UPDATE: '/categories/:id',
    DELETE: '/categories/:id',
  },
  CAMPAIGN: {
    BASE: '/campaigns',
  },
};
