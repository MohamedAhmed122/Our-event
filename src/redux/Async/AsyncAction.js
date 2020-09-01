import { ASYNC_ACTION_START ,ASYNC_ACTION_ERROR,ASYNC_ACTION_FINISH } from './AsyncType'


export const asyncStart =()=>({
    type: ASYNC_ACTION_START
})


export const asyncFinish =()=>({
    type: ASYNC_ACTION_FINISH
})


export const asyncError =(error)=>{
    console.log(error)
    return{
        type: ASYNC_ACTION_ERROR,
        payload: error
    }
}