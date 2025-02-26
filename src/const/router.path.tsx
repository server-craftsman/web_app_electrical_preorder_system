export const ROUTER_URL = {
  LOGIN: '/login',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',
  PROFILE: '/profile',
  ADMIN: {
    BASE: '/admin',
    HISTORY: '/admin/history',
    ACCOUNT: '/admin/account',
    PRODUCT: '/admin/product',
    CATEGORY: '/admin/category',
  },
  STAFF: {
    BASE: '/staff',
    HISTORY: '/staff/history',
    ACCOUNT: '/staff/account',
    PRODUCT: '/staff/product',
    PREORDER: '/staff/preorder',
  },
  CUSTOMER: {
    BASE: '/customer',
    PROFILE: '/customer/profile',
    ORDERS: '/customer/orders',
    RETURN_ORDER: '/customer/return-order',
    CHANGE_PASSWORD: '/customer/change-password',
    LOGOUT: '/customer/logout',
  },
  COMMON: {
    HOME: '/',
    PRODUCT_DETAIL: '/product', 
  },
};
