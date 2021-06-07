import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyBkBZPq0-iyRVDU_V_c9W5IqXb0xt_2Tdg",
  authDomain: "app-firebase-9c885.firebaseapp.com",
  projectId: "app-firebase-9c885",
  storageBucket: "app-firebase-9c885.appspot.com",
  messagingSenderId: "386292638900",
  appId: "1:386292638900:web:85accb2c975e0bd493e3e1",
  measurementId: "G-GKLNNLH6X4"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const store = fire.firestore()
const auth = fire.auth()

export { store, auth, firebase }