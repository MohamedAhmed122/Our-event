import {UPDATE_EVENT,CREATE_EVENT,DELETE_EVENT, FETCH_EVENT, LISTEN_TO_EVENT_CHAT, CLEAR_COMMENTS} from './EventType'


const initialState ={ 
    events:[],
    comment: [] 
}


const eventReducer=(state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_EVENT:
            return {
            ...state,
            events: [...state.events, payload],
            };
        case UPDATE_EVENT:
            return {
            ...state,
            events: [
                ...state.events.filter((evt) => evt.id !== payload.id),
                payload,
            ],
        };
        case DELETE_EVENT:
            return {
                ...state,
                events: [...state.events.filter((evt) => evt.id !== payload)],
            };
        case FETCH_EVENT:
            return{
                ...state,
                events: payload
            }
        case LISTEN_TO_EVENT_CHAT:
            return{
                ...state,
                comment: payload
            }
        case CLEAR_COMMENTS:
            return{
                ...state,
                comment:[]
            }
        default:
            return state;
    }
}

export default eventReducer;