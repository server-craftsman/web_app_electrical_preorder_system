import { helper } from '.';

export const checkURL = (url: string) => {
  return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(url);
};

export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhoneNumber = (phoneNumber: string) => {
  return /^\d{10}$/.test(phoneNumber);
};

export const validatePassword = (password: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
};

export const validateName = (name: string) => {
  return /^[a-zA-Z\s]+$/.test(name);
};

export const validateAddress = (address: string) => {
  return /^[a-zA-Z\s]+$/.test(address);
};

export const isEmptyObject = (obj: Record<string, unknown>) => {
  return Object.keys(obj).length === 0;
};

export const isEmptyArray = (arr: Record<string, unknown>[]) => {
  return arr.length === 0;
};

export const isEmptyString = (str: string) => {
  return str.trim() === '';
};

export const isEmptyNumber = (num: number) => {
  return num === 0;
};

export const limitMemoryFile = (file: File) => {
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    helper.notificationMessage('Kích thước tệp lớn hơn 5MB', 'error');
  };
  return false;
};
