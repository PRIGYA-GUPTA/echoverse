// Import the functions you need from the SDKs
// Required for side-effects
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKn1x1SYIvg68fJVXNvz6qldcC59kX2dg",
  authDomain: "echoverse-2cfea.firebaseapp.com",
  databaseURL: "https://echoverse-2cfea-default-rtdb.firebaseio.com",
  projectId: "echoverse-2cfea",
  storageBucket: "echoverse-2cfea.appspot.com",
  messagingSenderId: "510998338572",
  appId: "1:510998338572:web:60ba74ff591d92c99b6229",
  measurementId: "G-6955C3V798",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();

export const db = getFirestore(app);
