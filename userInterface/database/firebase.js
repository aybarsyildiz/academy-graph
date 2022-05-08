// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByVtuthpclTtVrypySytZC5-ffYtgA33E",
  authDomain: "yazlab2-ef51a.firebaseapp.com",
  databaseURL: "https://yazlab2-ef51a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "yazlab2-ef51a",
  storageBucket: "yazlab2-ef51a.appspot.com",
  messagingSenderId: "109985645467",
  appId: "1:109985645467:web:1746c86d0186ac5423173e",
  measurementId: "G-NJDDP5EEJC"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}


const auth = firebase.auth()


export { auth };