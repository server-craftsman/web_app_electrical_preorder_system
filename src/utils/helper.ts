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
      style: { backgroundColor: type === "success" ? "#1a237e" : type === "error" ? "#d32f2f" : type === "info" ? "#1a237e" : type === "warning" ? "#ff9800" : "#ffffff" }
    };
  
    return type === "success" ? toast.success(message, options as ToastOptions<unknown>) : type === "error" ? toast.error(message, options as ToastOptions<unknown>) : type === "info" ? toast.info(message, options as ToastOptions<unknown>) : toast.warning(message, options as ToastOptions<unknown>);
  };