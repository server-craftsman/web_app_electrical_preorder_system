
// Example utility function for local storage
export const getItemInLocalStorage = (key: string) => localStorage.getItem(key);

export const removeItemInLocalStorage = (key: string) =>
  localStorage.removeItem(key);

export const clearLocalStorage = () => localStorage.clear();


export const getUserInfoByAccessToken = (key: string, accessToken: string) => {
  const item = localStorage.getItem(accessToken);
  return item ? JSON.parse(item)[key] : null;
};


export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};