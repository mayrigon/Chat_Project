import { initializeApp } from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA5wVa9CWUCM0BEhzZKzuITjxO2CZjMvQQ",
  authDomain: "chat-project-7543d.firebaseapp.com",
  projectId: "chat-project-7543d",
  storageBucket: "chat-project-7543d.appspot.com",
  messagingSenderId: "88275249925",
  appId: "1:88275249925:web:070c23470a247c8959e56c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()
const marcarTempo = firebase.firestore.FieldValue.serverTimestamp

export { db, auth, marcarTempo }

