import {UPDATE_EVENT,CREATE_EVENT,DELETE_EVENT} from './EventType'

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
