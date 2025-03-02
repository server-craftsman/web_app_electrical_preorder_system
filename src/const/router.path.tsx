export const ROUTER_URL = {
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_TOKEN: '/verify',
  UNAUTHORIZED: '/unauthorized',
  PROFILE: '/profile',
  ADMIN: {
    BASE: '/admin',
    HISTORY: '/admin/history',
    ACCOUNT: '/admin/account',
    PRODUCT: '/admin/product',
    PRODUCT_DETAIL: '/admin/product/:slug',
    CATEGORY: '/admin/category',
    CAMPAIGN: '/admin/campaign',
  },
  STAFF: {
    BASE: '/staff',
    ACCOUNT: '/staff/account',
    ORDERS: '/staff/orders',
    PREORDER: '/staff/preorder',
    HISTORY: '/staff/history',
  },
  CUSTOMER: {
    BASE: '/customer',
    PROFILE: '/customer/profile',
    ORDERS: '/customer/orders',
    RETURN_ORDER: '/customer/return-order',
    CHANGE_PASSWORD: '/customer/change-password',
    LOGOUT: '/customer/logout',
    ABOUT: '/customer/about',
  },
  COMMON: {
    HOME: '/',
    PRODUCT: '/product',
    GET_PRODUCT_DETAIL_BY_SLUG: '/product/:slug',
    ADD_TO_CART: '/cart'
  },
};
