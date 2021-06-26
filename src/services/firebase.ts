import firebase from "firebase";

import 'firebase/app'
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBogvQ-i6t3kr2zBmrfJfaEJfMeZ7IjYTg",
  authDomain: "letmeask-88518.firebaseapp.com",
  databaseURL: "https://letmeask-88518-default-rtdb.firebaseio.com",
  projectId: "letmeask-88518",
  storageBucket: "letmeask-88518.appspot.com",
  messagingSenderId: "731345867260",
  appId: "1:731345867260:web:cba81c6a2c2fcdb2ab6279",
  measurementId: "G-W2875HF2TZ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();

const database = firebaseApp.database();


export { firebase, auth, database };


