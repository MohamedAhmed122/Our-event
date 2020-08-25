import firebase from '../../firebase/firebase'
import { SIGN_IN_USER, SIGN_OUT_USER } from "./Auth.Type";


export const signInUser = (user) =>({
  type: SIGN_IN_USER,
  payload: user
})

export const verifyAuth =()=>{
  return (dispatch=>{
    // to persist the the data 
    return firebase.auth().onAuthStateChanged(user =>{
      if (user){
        dispatch(signInUser(user))
      }else{
        dispatch(signOutUser())
      }
    })
  })
}


export const signOutUser = () => ({
  type: SIGN_OUT_USER,
});
