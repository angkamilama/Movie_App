import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC21TvF_WvYaph54JexxIjK6u0L4cN-yPc",
  authDomain: "movie-app-bb515.firebaseapp.com",
  projectId: "movie-app-bb515",
  storageBucket: "movie-app-bb515.firebasestorage.app",
  messagingSenderId: "889871771831",
  appId: "1:889871771831:web:5845cf5f1d9b9daab78532",
  measurementId: "G-KF8T16WX6W",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
