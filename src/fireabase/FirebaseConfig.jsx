// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBRPSE4jI5HZx5cv7fH5w-6SHfmHIaSLxQ",
  authDomain: "book-ecommerce-a4f53.firebaseapp.com",
  projectId: "book-ecommerce-a4f53",
  storageBucket: "book-ecommerce-a4f53.appspot.com",
  messagingSenderId: "376557462778",
  appId: "1:376557462778:web:c189ebd29e236fa9d89543"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}