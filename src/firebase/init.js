import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAOqd5AO60DiYxw-3-8g-kG_ZthhrFdnTA",
  authDomain: "proyectovue-44d4d.firebaseapp.com",
  databaseURL: "https://proyectovue-44d4d-default-rtdb.firebaseio.com",
  projectId: "proyectovue-44d4d",
  storageBucket: "proyectovue-44d4d.appspot.com",
  messagingSenderId: "278049726618",
  appId: "1:278049726618:web:29146a03e4156474bd3f23"
};
initializeApp(firebaseConfig)
const db = getFirestore()
export default db