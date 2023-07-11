// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDw7kkr05snIWastyCZXbeXNmaiw5x4-Ys",
  authDomain: "scan-27d1f.firebaseapp.com",
  projectId: "scan-27d1f",
  storageBucket: "scan-27d1f.appspot.com",
  messagingSenderId: "1098790470046",
  appId: "1:1098790470046:web:b21bc6975ffc5bcae5968f",
  measurementId: "G-1ZXTTXJB53"
};

// Initialize Firebase

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};