import firebase from './firebase'

export const signInWithEmail=(creds)=>{
    const auth = firebase.auth();
    return  auth.signInWithEmailAndPassword(creds.email,creds.password)
}

export const SignOut=()=>{
    const auth = firebase.auth();
    return  auth.signOut()
}