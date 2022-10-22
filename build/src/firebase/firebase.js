"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
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
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.auth = (0, auth_1.getAuth)(app);
exports.db = (0, firestore_1.getFirestore)(app);
