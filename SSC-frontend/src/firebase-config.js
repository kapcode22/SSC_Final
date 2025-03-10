
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlIfIN1OaudkYeqvfJrc2zhmnU42YQSyk",
  authDomain: "ssc-spc.firebaseapp.com",
  projectId: "ssc-spc",
  storageBucket: "ssc-spc.appspot.com",
  messagingSenderId: "960220379553",
  appId: "1:960220379553:web:ce2c3a83b7443bf6a573e0"
};

// Initialize Firebaseconst app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);