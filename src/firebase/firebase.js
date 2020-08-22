import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var firebaseConfig = {
    apiKey: "AIzaSyCUQA9i7E3HJhE9pGRlmUNq7NuI--hZl9w",
    authDomain: "re-vents-e73b4.firebaseapp.com",
    databaseURL: "https://re-vents-e73b4.firebaseio.com",
    projectId: "re-vents-e73b4",
    storageBucket: "re-vents-e73b4.appspot.com",
    messagingSenderId: "629622995328",
    appId: "1:629622995328:web:b0f3aaf2acc9af622ea965",
    measurementId: "G-7HB7J529Q0"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore()

export default firebase;
