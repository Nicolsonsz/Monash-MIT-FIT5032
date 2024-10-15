// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSSZF7I_UNp5Naj2oa1_41FqgmbY0PYwU",
  authDomain: "fit5032-lab-project-b4c98.firebaseapp.com",
  projectId: "fit5032-lab-project-b4c98",
  storageBucket: "fit5032-lab-project-b4c98.appspot.com",
  messagingSenderId: "957639074054",
  appId: "1:957639074054:web:98d25a766820adca3b3e87"
};




// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db