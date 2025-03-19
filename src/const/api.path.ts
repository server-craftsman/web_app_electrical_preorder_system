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
    GET_USER_ID: '/users/:id',
    CHANGE_PASSWORD: '/users/:id/password',
    UPDATE: '/users/:id',
    DELETE: '/users/:id',
    // REGISTER_DEVICE_TOKEN: (userId: string) => `/users/${userId}/device-token`,
    REGISTER_DEVICE_TOKEN: '/users/:id/device-token',
  },
  PRODUCT: {
    GET_ALL: '/products',
    GET_BY_ID: '/products/:id',
    GET_BY_SLUG: '/products/:slug',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
    DELETE_MULTIPLE: '/products',
    SEARCH: '/products/search',
  },
  CATEGORY: {
    BASE: '/categories',
    UPDATE: '/categories/:id',
    DELETE: '/categories/:id',
  },
  CAMPAIGN: {
    BASE: '/campaigns',
    UPDATE: '/campaigns/:id',
    DELETE: '/campaigns/:id',
    GET_BY_ID: '/campaigns/:id',
    HISTORY: '/campaigns/:id/histories',
  },
  CAMPAIGN_STAGE: {
    BASE: '/campaigns/:id/stages',
    UPDATE: '/campaigns/:id/stages/:stageId',
    DELETE: '/campaigns/:id/stages/:stageId',
    GET_BY_ID: '/campaign-stages/:id',
  },
  NOTIFICATIONS: {
    BASE: '/notifications',
    SEND: '/notifications/send',
    MARK_AS_READ: (notificationId: string) =>
      `/notifications/${notificationId}`,
    GET_BY_USER: (userId: string) => `/notifications/${userId}`,
  },
  ORDER: {
    CREATE: '/orders',
    VIEW_ORDER: '/users/orders',
    VIEW_ORDER_BY_ADMIN: '/orders',
    DELETE_ORDER: '/orders/:id',
  },
  PAYMENT: {
    CREATE: '/payments',
    GET_PAYMENT_BY_ORDER_CODE: '/payments/payment-link/:id',
    PAYMENT: '/payments',
  },
};
