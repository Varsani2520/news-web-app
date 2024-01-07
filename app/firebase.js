import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyCfa4PAtbZAvlEPxYD0Po3UmVZCLhItGOU",

  authDomain: "news-web-app-ff3ec.firebaseapp.com",

  projectId: "news-web-app-ff3ec",

  storageBucket: "news-web-app-ff3ec.appspot.com",

  messagingSenderId: "68425481063",

  appId: "1:68425481063:web:a53e1bc24b2bcab7850dc2",

  measurementId: "G-QPD9K58RVW",
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .then(() => {
    // Offline persistence enabled successfully
    console.log("Offline support enabled");
  })
  .catch((error) => {
    // Error handling if offline persistence fails
    console.error("Error enabling offline support:", error);
  });

export { app, db };

export default app;
