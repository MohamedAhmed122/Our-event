import {UPDATE_EVENT,CREATE_EVENT,DELETE_EVENT, FETCH_EVENT, LISTEN_TO_EVENT_CHAT} from './EventType'
import {asyncStart, asyncFinish, asyncError} from '../Async/AsyncAction'
import { fetchData } from '../../api/MockApi'


export const loadingEvents =()=> {
    return (async(dispatch)=>{
        dispatch(asyncStart())
        try {
            const events = await fetchData();
            dispatch({type: FETCH_EVENT, payload: events});
            dispatch(asyncFinish())
        } catch (error) {
            dispatch(asyncError(error));
        }
    }
    ) 
}

export const listenEvent =(event)=>({
    type: FETCH_EVENT,
    payload: event
})



export const createEvent =(event)=>({
    type:CREATE_EVENT,
    payload: event
})

export const updateEvent =(event)=>({
    type:UPDATE_EVENT,
    payload: event
})


export const deleteEvent =(event)=>({
    type:DELETE_EVENT,
    payload: event
})
export const listenToEventChat =(comment)=>({
    type: LISTEN_TO_EVENT_CHAT,
    payload: comment
})