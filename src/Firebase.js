// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs5oGflUSX0cEoCCv7B88sjbWqs1mGUqw",
  authDomain: "taskflow-db-01.firebaseapp.com",
  projectId: "taskflow-db-01",
  storageBucket: "taskflow-db-01.firebasestorage.app",
  messagingSenderId: "66787917556",
  appId: "1:66787917556:web:68b9b696e94516a8e2a8a1",
  measurementId: "G-J85K81CFPV",

  databaseURL: "https://taskflow-db-01-default-rtdb.firebaseio.com"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);