import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
});

//  Users Login and Signup
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// others
export const database = firebase.database();
export const firestore = firebase.firestore();
