import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCjaSQPdq1OZ_oRS7_1qruEznYzm7_e6lQ",
  authDomain: "expense-tracker-v1-2eb23.firebaseapp.com",
  databaseURL: "https://expense-tracker-v1-2eb23-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-v1-2eb23",
  storageBucket: "expense-tracker-v1-2eb23.firebasestorage.app",
  messagingSenderId: "718975100728",
  appId: "1:718975100728:web:2ca9e18b1c59c81afec3cd",
  measurementId: "G-F5CXH2PRQY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const database = getDatabase(app);
