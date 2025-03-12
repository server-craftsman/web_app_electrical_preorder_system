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
const messaging = getMessaging(app);

// Hàm lấy token FCM
export const getFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: "BASP0DjCqiyUkuqJurDUAId_SJC-fPOQXX0vOo8NYcS8QdH4-bekGtftaBFQ_6UyGcC2n0dxzfu5792lEcLSJUA" });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.warn("User denied permission for notifications.");
    }
  } catch (error) {
    console.error("Error getting FCM token", error);
  }
};
