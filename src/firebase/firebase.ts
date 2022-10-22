// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBetwvlz6Fta9lTNzTCvq86dirlPhU5LUs",
  authDomain: "system-inventory-2b959.firebaseapp.com",
  projectId: "system-inventory-2b959",
  storageBucket: "system-inventory-2b959.appspot.com",
  messagingSenderId: "861859175526",
  appId: "1:861859175526:web:96fe0a6ebd1f54a7f0a1a7",
  measurementId: "G-D4082ZSM2X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
