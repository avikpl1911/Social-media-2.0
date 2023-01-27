// Import the functions you need from the SDKs you need


import firebase from "firebase"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_APIKEY,
  authDomain: "social-media-6c903.firebaseapp.com",
  projectId: "social-media-6c903",
  storageBucket: "social-media-6c903.appspot.com",
  messagingSenderId: "115723769195",
  appId: "1:115723769195:web:ff02b6834ca56da743e82e",
  measurementId: "G-KNGY61HK6W"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage =firebase.storage();
export default storage;

