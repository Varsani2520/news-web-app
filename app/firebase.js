import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyAFKJIBcnicPPJdEA3drytEQL1iCjy-hbo",

  authDomain: "news-app-9cb2c.firebaseapp.com",

  projectId: "news-app-9cb2c",

  storageBucket: "news-app-9cb2c.appspot.com",

  messagingSenderId: "300586186042",

  appId: "1:300586186042:web:9d2457f765aefd3630cc03",

  measurementId: "G-PH15TW1W65",
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
