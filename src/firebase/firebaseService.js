import firebase from './firebase'
import { setUserProfile } from './firestoreService';
import { toast } from 'react-toastify';


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