import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyBAMu4VP1qcz-scw_KY19AUygVVfipL_4k",
  authDomain: "telegram-702bb.firebaseapp.com",
  databaseURL: "https://telegram-702bb.firebaseio.com",
  projectId: "telegram-702bb",
  storageBucket: "telegram-702bb.appspot.com",
  messagingSenderId: "339201793761",
  appId: "1:339201793761:web:4bc4c8d35c10e7b134e1a0",
});

//  Users Login and Signup
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// others
export const database = firebase.database();
export const firestore = firebase.firestore();
