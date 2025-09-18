// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDny0BnimfMG31XbghTXEdR8KZr-DW-JVE",
  authDomain: "plant-care-1e330.firebaseapp.com",
  projectId: "plant-care-1e330",
  storageBucket: "plant-care-1e330.firebasestorage.app",
  messagingSenderId: "528107307335",
  appId: "1:528107307335:web:e77c907d9e3d8a0dfecc62",
  measurementId: "G-8X483F9YRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)
export const db = getFirestore(app)