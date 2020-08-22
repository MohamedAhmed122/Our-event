### How to Read data from The FireStore in easy way

Create Firebase.config.js

===>
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

the configuration of firebase

        --------   2   --------

Create FireStore.config.js

import firebase from "./firebase";

// to give you access to the firestore db
const db = firebase.firestore();

export const getEventFromFirestore = (observer) => {
  // to get the data from the db
  return db.collection("events").onSnapshot(observer);
};

           --------  3  --------


  useEffect(() => {
    const unsubscribe = getEventFromFirestore({
      next: (snapshot) =>
        console.log(snapshot.docs.map((docSnapshot) => docSnapshot.data())),
      error: (error) => console.log(error),
    });
    return unsubscribe;
  });



