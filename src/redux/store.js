import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";
import {composeWithDevTools} from 'redux-devtools-extension'

import RootReducer from "./rootReducer";
import { verifyAuth } from "./Auth/Auth.Action";

const middleWare = [logger, thunk];

export const ConfigStore=()=>{
    const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(...middleWare)))

    store.dispatch(verifyAuth());
    return store;
} 








// export function configureStore() {
//     return 
// }