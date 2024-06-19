// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.BOOK_APIKEY,
  authDomain: "book-management-57c93.firebaseapp.com",
  projectId: "book-management-57c93",
  storageBucket: "book-management-57c93.appspot.com",
  messagingSenderId: "234899117929",
  appId: "1:234899117929:web:49969d9f17dd4bfcc34ff8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
