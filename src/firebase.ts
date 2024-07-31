import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRSHs0eDPUtyC4TPSvha4a7xKuj7AZCYc",
  authDomain: "twitter-68f23.firebaseapp.com",
  projectId: "twitter-68f23",
  storageBucket: "twitter-68f23.appspot.com",
  messagingSenderId: "454943497142",
  appId: "1:454943497142:web:83db6f9b72143b93003f17",
  measurementId: "G-RYR4HP64HS",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
