// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBGta3ICtqwx6yDJ9CKU1KhUzJgOb-b0Y",
  authDomain: "moviesflix-33911.firebaseapp.com",
  projectId: "moviesflix-33911",
  storageBucket: "moviesflix-33911.appspot.com",
  messagingSenderId: "260041295798",
  appId: "1:260041295798:web:85d032b2e36ee1a663a317",
  measurementId: "G-YKLV1MW1R5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();