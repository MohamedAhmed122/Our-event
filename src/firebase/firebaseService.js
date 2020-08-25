import firebase from './firebase'

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
        return await result.user.updateProfile({
            displayName: creds.displayName
        })
    } catch (error) {
        throw error;
    }
}

// export const RegisterInFirebase = async (creds) => {
//     const auth = firebase.auth();
//     return result = await auth.createUserWithEmailAndPassword(
//       creds.email,
//       creds.password
//     );
//   };
  