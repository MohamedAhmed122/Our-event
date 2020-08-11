import {UPDATE_EVENT,CREATE_EVENT,DELETE_EVENT} from './EventType'
import SampleData from '../../api/SampleData';

const initialState ={ events: SampleData}


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
        default:
            return state;
    }
}

export default eventReducer;