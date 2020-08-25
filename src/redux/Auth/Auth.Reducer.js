import { SIGN_IN_USER, SIGN_OUT_USER } from "./Auth.Type";
const initialState={
    isAuthenticated: false,
    currentUser:null
}

const AuthReducer=(state=initialState, {type, payload})=>{
    switch(type){
        case SIGN_IN_USER:
            return{
                ...state,
                isAuthenticated: true,
                currentUser: {
                    email: payload.email,
                    photoURL: payload.photoURL,
                    uid: payload.uid,
                    displayName: payload.displayName,
                    providerId: payload.providerData[0].providerId              
                }
            }
        case SIGN_OUT_USER:
            return{
                ...state,
                isAuthenticated: false,
                currentUser:null
            }
        default:
            return state;
    }
}
export default  AuthReducer