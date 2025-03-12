import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Cấu hình Firebase (thay bằng thông tin của bạn)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const messaging = typeof window !== 'undefined' && 'serviceWorker' in navigator ? getMessaging(app) : null;

// Hàm lấy token FCM
export const getFCMToken = async () => {
  if (!messaging) {
    console.warn("Messaging is not supported in this environment");
    return null;
  }
  
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        const token = await getToken(messaging, { 
          vapidKey: import.meta.env.VITE_VAPID_KEY 
        });
        console.log("FCM Token:", token);
        return token;
      } catch (tokenError) {
        console.error("Error getting FCM token", tokenError);
        return null;
      }
    } else {
      console.warn("User denied permission for notifications.");
      return null;
    }
  } catch (error) {
    console.error("Error requesting notification permission", error);
    return null;
  }
};
