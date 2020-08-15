import { SIGN_IN_USER, SIGN_OUT_USER } from "./Auth.Type";
const initialState={
    isAuthenticated: false,
    currentUser:null
}

const AuthReducer=(state=initialState, action)=>{
    switch(action.type){
        case SIGN_IN_USER:
            return{
                ...state,
                isAuthenticated: true,
                currentUser: {
                    email: action.payload.email,
                    photoURL: '/assets/user.png'
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