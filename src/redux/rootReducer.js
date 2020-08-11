import { combineReducers } from "redux";

import eventReducer from './Event/EventReducer'

const rootReducer = combineReducers({
    event : eventReducer
});

export default rootReducer;
