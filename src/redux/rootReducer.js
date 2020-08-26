import { combineReducers } from "redux";

import eventReducer from './Event/EventReducer'
import modalReducer from "./Modal/ModalReducer";
import AuthReducer from "./Auth/Auth.Reducer";
import AsyncReducer from './Async/AsyncReducer'
import profileReducer from './Profile/Profile.Reducer'


const rootReducer = combineReducers({
    event : eventReducer,
    modals: modalReducer,
    auth: AuthReducer,
    async:  AsyncReducer,
    profile: profileReducer,
});

export default rootReducer;



