import { combineReducers } from "redux";

import eventReducer from './Event/EventReducer'
import modalReducer from "./Modal/ModalReducer";
import AuthReducer from "./Auth/Auth.Reducer";
import AsyncReducer from './Async/AsyncReducer'

const rootReducer = combineReducers({
    event : eventReducer,
    modals: modalReducer,
    auth: AuthReducer,
    async:  AsyncReducer
});

export default rootReducer;
