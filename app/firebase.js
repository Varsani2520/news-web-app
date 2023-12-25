import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDrtNh33kXdMI1ulOmousrqf7oe04QP92s",
  authDomain: "news-afdf7.firebaseapp.com",
  projectId: "news-afdf7",
  // storageBucket: "YOUR_STORAE_BUCKET",
  // messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  // appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
