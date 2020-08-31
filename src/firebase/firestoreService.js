import firebase from "./firebase";

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

export const listenToEventFromFirestore = () => {
  // to listen  data from the db
  return db.collection("events").orderBy("date");
};

export const listenToEventDoc = (eventId) => {
  return db.collection("events").doc(eventId);
};

//The CRUD
//Create EVENT to the Firebase

export const CreateEventToFirestore = (event) => {
  const user = firebase.auth().currentUser
  return db.collection("events").add({
    ...event,
    hostUId: user.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    // need to query the array
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
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

// Create the collection for the Users
export const setUserProfile = (user) => {
  return db.collection("users").doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const getUserProfile = (userId) => {
  return db.collection("users").doc(userId);
};

export const updateProfile = async (value) => {
  const user = firebase.auth().currentUser;
  try {
    await user.updateProfile({
      displayName: value.displayName,
    });
    return await db.collection("users").doc(user.uid).update(value);
  } catch (error) {
    throw error;
  }
};

// to update user profile photo
export const updateUserProfilePhoto = async (downloadURL, fileName) => {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("users").doc(user.uid);
  try {
    //we get the data from the userDoc
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection("users").doc(user.uid).update({
        photoURL: downloadURL,
      });
      // to update the user auth
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    //add the photos to the the user's photo collection inside their doc
    return await db.collection("users").doc(user.uid).collection("photos").add({
      name: fileName,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserPhotos = (userId) => {
  return db.collection("users").doc(userId).collection("photos");
};

export const setMainPhoto = async (photo) => {
  const user = firebase.auth().currentUser;

  try {
    await db.collection("users").doc(user.uid).update({
      photoURL: photo.url,
    });
    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
};

export const deletePhotoFromCollection =(photoId)=>{
  const userUid = firebase.auth().currentUser.uid;
  return db.collection('users').doc(userUid).collection('photos').doc(photoId).delete()
}

export const addUserAttendance =(event) =>{
  const user = firebase.auth().currentUser;
  return db.collection('events').doc(event.id).update({
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    // need to query the array
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
  })
}

export const cancelUserAttendance = async(event) => {
  const user = firebase.auth().currentUser;
  try {
    const eventDoc = await db.collection('events').doc(event.id).get();
    return db.collection('events').doc(event.id).update({
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: eventDoc.data().attendees.filter((attendee) => attendee.id !== user.uid),
      });
  } catch (error) {
    throw error;
  }
}