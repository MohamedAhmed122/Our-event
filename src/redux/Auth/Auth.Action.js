import firebase from '../../firebase/firebase'
import { SIGN_IN_USER, SIGN_OUT_USER } from "./Auth.Type";
import { APP_LOADED } from '../Async/AsyncType';


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
        dispatch({type: APP_LOADED})
      }else{
        dispatch(signOutUser())
        dispatch({type: APP_LOADED})
      }
    })
  })
}


export const signOutUser = () => ({
  type: SIGN_OUT_USER,
});
