import firebase from "./firebase";
import cuid from "cuid";

// to give you access to the firestore db
const db = firebase.firestore();

export const dataFromSnapshot = (snapshot) => {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  // if you have date so it will be timeStamp and we need it to change it to time javaScript
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
};

export const listenToEventFromFirestore = (observer) => {
  // to listen  data from the db
  return db.collection("events").orderBy("date");
};

export const listenToEventDoc = (eventId) => {
  return db.collection("events").doc(eventId);
};

//The CRUD
//Create EVENT to the Firebase

export const CreateEventToFirestore = (event) => {
  return db.collection("events").add({
    ...event,
    hostedBy: "Diana",
    hostPhotoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      name: "Diana",
      photoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    }),
  });
};

//Update EVENT to the Firebase
export const UpdateEventToFirestore = (event) => {
  return db.collection("events").doc(event.id).update(event);
};

//Delete EVENT to the Firebase
export const deleteEventFromFirestore = (eventId) => {
  return db.collection("events").doc(eventId).delete();
};

//For Cancelation EVENT to the Firebase
export const cancelEvent = (event) => {
  return db.collection("events").doc(event.id).update({
    isCancel: !event.isCancel,
  });
};

export const setUserProfile=(user)=>{
  return db.collection('users').doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,

    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
}
