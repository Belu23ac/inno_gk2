// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8eaQ0PUEdspvog910vmw-lRPOAe5_rWU",
  authDomain: "cervisia-inno.firebaseapp.com",
  projectId: "cervisia-inno",
  storageBucket: "cervisia-inno.firebasestorage.app",
  messagingSenderId: "356553908383",
  appId: "1:356553908383:web:bc585c1cb379a46592c2aa",
  measurementId: "G-QMY8CVY5WC"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth with AsyncStorage for persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  // If auth is already initialized, just get it
  auth = getAuth(app);
}

const db = getFirestore(app);

export { auth, db };
export default app;