import firebase from './firebase'
import { setUserProfile } from './firestoreService';
import { toast } from 'react-toastify';


// Convert from object To Array
export const ConvertToArray =(array)=>{
    if(array){
        return Object.entries(array).map(e => Object.assign({}, e[1],{id: e[0]}))
    }
}

export const signInWithEmail=(creds)=>{
    const auth = firebase.auth();
    return  auth.signInWithEmailAndPassword(creds.email,creds.password)
}

export const SignOut=()=>{
    const auth = firebase.auth();
    return  auth.signOut() 
}

export const RegisterInFirebase =async(creds)=>{
    try {
        const auth = firebase.auth();
        const result = await  auth.createUserWithEmailAndPassword(creds.email,creds.password)
        await result.user.updateProfile({
            displayName: creds.displayName,
            createdAt : creds.createdAt
        })
        return await setUserProfile(result.user)
    } catch (error) {
        throw error;
    }
}

export const socialLogin = async(selectedProvider)=>{
    let provider;
    const auth = firebase.auth();
    if(selectedProvider === 'facebook'){
        provider = new firebase.auth.FacebookAuthProvider();
    }
    if (selectedProvider === 'google'){
        provider = new firebase.auth.GoogleAuthProvider();
    }
    try {
        const result = await auth.signInWithPopup(provider);
        console.log(result);
        if(result.additionalUserInfo.isNewUser){
            await setUserProfile(result.user)
        }
    } catch (error) {
        toast.error(error.message)
    }
}


export const updateUserPassword =(creds)=>{
    const auth = firebase.auth()
    const user = auth.currentUser;
    return user.updatePassword(creds.newPassword1)
}

export const uploadToFirebaseStorage =(file,fileName)=>{
    const user = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref();
    return storageRef.child(`${user.uid}/user_images/${fileName}`).put(file)
}

export const deleteFromFirbaseStorage =(fileName)=>{
    const userUid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref();
    return storageRef.child(`${userUid}/user_images/${fileName}`).delete()
}

export const addEventChatComment =(eventId,comment)=>{
    const user = firebase.auth().currentUser;

    const newComment ={
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        text: comment,
        date: Date.now()
    }
    // access the firebase database and get the ref of the location of the store
    // and every event has it is own chat then push the comment
    return firebase.database().ref(`chat/${eventId}`).push(newComment);

}

export const getEventChatRef =(eventId)=>{
    return firebase.database().ref(`chat/${eventId}`).orderByKey()
}
