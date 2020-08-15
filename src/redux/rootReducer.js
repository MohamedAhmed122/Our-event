import { combineReducers } from "redux";

import eventReducer from './Event/EventReducer'
import modalReducer from "./Modal/ModalReducer";

const rootReducer = combineReducers({
    event : eventReducer,
    modals: modalReducer
});

export default rootReducer;
