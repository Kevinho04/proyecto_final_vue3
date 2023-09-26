import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAOqd5AO60DiYxw-3-8g-kG_ZthhrFdnTA",
    authDomain: "proyectovue-44d4d.firebaseapp.com",
    projectId: "proyectovue-44d4d",
    storageBucket: "proyectovue-44d4d.appspot.com",
    messagingSenderId: "278049726618",
    appId: "1:278049726618:web:29146a03e4156474bd3f23"
  };

firebase.initializeApp(firebaseConfig);

// Agrega el servicio de Firestore a la aplicación
firebase.use(firebase.firestore());
