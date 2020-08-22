import {UPDATE_EVENT,CREATE_EVENT,DELETE_EVENT, FETCH_EVENT} from './EventType'


const initialState ={ events:[] }


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
        default:
            return state;
    }
}

export default eventReducer;