// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSKHExEafmpmN6sJHShuxJfyNw3cvKIBA",
  authDomain: "test-c2eeb.firebaseapp.com",
  projectId: "test-c2eeb",
  storageBucket: "test-c2eeb.appspot.com",
  messagingSenderId: "880747267437",
  appId: "1:880747267437:web:61a58d08d4b6dfa90e4664",
  measurementId: "G-W78D4SSWRZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
