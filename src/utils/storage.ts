export const getItemInLocalStorage = (key: string) => localStorage.getItem(key);

export const removeItemInLocalStorage = (key: string) =>
  localStorage.removeItem(key);

export const clearLocalStorage = () => {
  localStorage.clear();
 
};

export const setUserInfo = (userInfo: any) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

export const getUserInfo = () => {
  const item = localStorage.getItem('userInfo');
  return item ? JSON.parse(item) : null;
};

export const setToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const getToken = () => {
  return localStorage.getItem('accessToken');
};
