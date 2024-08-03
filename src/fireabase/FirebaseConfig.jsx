// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCqxk6Z72D-UUDkuOhojBIbrj2xcfCXLNA",
  authDomain: "pustak-sangrah-c54a2.firebaseapp.com",
  projectId: "pustak-sangrah-c54a2",
  storageBucket: "pustak-sangrah-c54a2.appspot.com",
  messagingSenderId: "706677105955",
  appId: "1:706677105955:web:a32026d45635b0cb1d5896"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}