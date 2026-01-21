import { initializeApp } from "firebase/app";
// ADD THIS LINE BELOW:
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAXgU-4gBw5xI3totKMwmNqmZsR7AKbjvk",
  authDomain: "auth-f8102.firebaseapp.com",
  projectId: "auth-f8102",
  storageBucket: "auth-f8102.firebasestorage.app",
  messagingSenderId: "884918603676",
  appId: "1:884918603676:web:9703400d922d4229a08259"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// These are now correctly imported and can be exported
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };