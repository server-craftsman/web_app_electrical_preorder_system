import { toast, ToastOptions } from 'react-toastify';
import { CampaignStatus } from '../app/enums';
import moment from 'moment';

//===========validate output
export const notificationMessage = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' = 'success'
) => {
  // console.log(`Notification: ${message}, Type: ${type}`);
  const options = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    style: {
      backgroundColor:
        type === 'success'
          ? 'green'
          : type === 'error'
            ? 'red'
            : type === 'info'
              ? 'blue'
              : type === 'warning'
                ? 'yellow'
                : '#ffffff',
    },
  };

  return type === 'success'
    ? toast.success(message, options as ToastOptions<unknown>)
    : type === 'error'
      ? toast.error(message, options as ToastOptions<unknown>)
      : type === 'info'
        ? toast.info(message, options as ToastOptions<unknown>)
        : toast.warning(message, options as ToastOptions<unknown>);
};

export const formatCurrency = (value: number) => {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatDateTime = (date: Date) => {
  return formatDate(date) + ' ' + formatTime(date);
};

export const formatDateTimeWithTimezone = (date: Date) => {
  return formatDateTime(date) + ' ' + date.getTimezoneOffset();
};

export const formatDateFullOptions = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const convertToMoment = (date: string) => {
  return moment(date);
};

//===========format color
export const formatCampaignStatus = (status: string) => {
  const baseClasses =
    'inline-block text-white font-semibold font-bold rounded-lg px-4 py-2';

  switch (status.toUpperCase()) {
    case CampaignStatus.SCHEDULED:
      return `${baseClasses} bg-yellow-500`;
    case CampaignStatus.ACTIVE:
      return `${baseClasses} bg-green-500`;
    case CampaignStatus.COMPLETED:
      return `${baseClasses} bg-blue-500`;
    case CampaignStatus.CANCELLED:
      return `${baseClasses} bg-red-500`;
    default:
      return `${baseClasses} bg-gray-400`;
  }
};

export const formatProductStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case 'AVAILABLE':
      return 'bg-green-500 text-white rounded-lg px-4 py-2';
    case 'OUT_OF_STOCK':
      return 'bg-yellow-500 text-white rounded-lg px-4 py-2';
    case 'PREORDER':
      return 'bg-blue-500 text-white rounded-lg px-4 py-2';
    case 'DISCONTINUED':
      return 'bg-red-500 text-white rounded-lg px-4 py-2';
    default:
      return 'bg-gray-500 text-white rounded-lg px-4 py-2';
  }
};

export const formatRoleAccountColor = (role: string) => {
  switch (role) {
    case 'ROLE_ADMIN':
      return 'bg-purple-600 text-white rounded-lg px-4 py-2';
    case 'ROLE_STAFF':
      return 'bg-blue-600 text-white rounded-lg px-4 py-2';
    case 'ROLE_CUSTOMER':
      return 'bg-green-600 text-white rounded-lg px-4 py-2';
    case 'ROLE_SUPPLIER':
      return 'bg-orange-600 text-white rounded-lg px-4 py-2';
    case 'ROLE_MANAGER':
      return 'bg-indigo-600 text-white rounded-lg px-4 py-2';
    default:
      return 'bg-gray-500 text-white rounded-lg px-4 py-2';
  }
};
