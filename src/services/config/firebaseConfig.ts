import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Cấu hình Firebase (thay bằng thông tin của bạn)
const firebaseConfig = {
  apiKey: "AIzaSyCPxbkOVDLMP07WzeI7FRsdm5QN4Wfd_PI",
  authDomain: "wsd392-b6560.firebaseapp.com",
  projectId: "wsd392-b6560",
  storageBucket: "wsd392-b6560.firebasestorage.app",
  messagingSenderId: "100999484571",
  appId: "1:100999484571:web:2b5fab89d15a112c11e23e",
  measurementId: "G-86HNXX9CNM"
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
