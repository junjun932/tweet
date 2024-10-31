import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBZz_sTIaa8Z00JjWs-bTdcCi-4mKevoII",
  authDomain: "tweet-3e265.firebaseapp.com",
  projectId: "tweet-3e265",
  storageBucket: "tweet-3e265.firebasestorage.app",
  messagingSenderId: "988055224331",
  appId: "1:988055224331:web:ef9cea8f5ce81ba03f470e"
};


const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);