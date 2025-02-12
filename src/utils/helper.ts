import { toast, ToastOptions } from "react-toastify";

export const notificationMessage = (message: string, type: "success" | "error" | "info" | "warning" = "success") => {
    // console.log(`Notification: ${message}, Type: ${type}`);
    const options = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: { backgroundColor: type === "success" ? "green" : type === "error" ? "red" : type === "info" ? "blue" : type === "warning" ? "yellow" : "#ffffff" }
    };
  
    return type === "success" ? toast.success(message, options as ToastOptions<unknown>) : type === "error" ? toast.error(message, options as ToastOptions<unknown>) : type === "info" ? toast.info(message, options as ToastOptions<unknown>) : toast.warning(message, options as ToastOptions<unknown>);
  };

export const formatCurrency = (value: number) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

export const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

export const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

export const formatDateTime = (date: Date) => {
    return formatDate(date) + ' ' + formatTime(date);
  };

export const formatDateTimeWithTimezone = (date: Date) => {
    return formatDateTime(date) + ' ' + date.getTimezoneOffset();
  };


