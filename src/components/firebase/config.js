import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBFiRbWlF-yjJXFacnOY3TQewYPj_Voc6E",
  authDomain: "beform-ff5fc.firebaseapp.com",
  projectId: "beform-ff5fc",
  storageBucket: "beform-ff5fc.appspot.com",
  messagingSenderId: "94196613618",
  appId: "1:94196613618:web:eb6b9b2f71983141212b6b",
  measurementId: "G-PWX0SJZ4WX"
};
// init firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

export {db}