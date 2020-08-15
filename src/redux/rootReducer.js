import { combineReducers } from "redux";

import eventReducer from './Event/EventReducer'
import modalReducer from "./Modal/ModalReducer";
import AuthReducer from "./Auth/Auth.Reducer";

const rootReducer = combineReducers({
    event : eventReducer,
    modals: modalReducer,
    auth: AuthReducer
});

export default rootReducer;
