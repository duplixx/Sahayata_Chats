// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzKHjfRX1uiOpA7wr3VhVmUm7jZ66qRX4",
  authDomain: "sahayta-chat.firebaseapp.com",
  projectId: "sahayta-chat",
  storageBucket: "sahayta-chat.appspot.com",
  messagingSenderId: "579901606374",
  appId: "1:579901606374:web:a18d8568acd38e18642e27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db =getFirestore();
export {auth,db}