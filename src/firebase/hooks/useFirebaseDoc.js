import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { asyncStart, asyncFinish, asyncError } from "../../redux/Async/AsyncAction"
import { dataFromSnapshot } from "../firestoreService"



export const useFirestoreDoc=({query, data,deps})=>{

 const dispatch = useDispatch()

 useEffect(() => {
        dispatch(asyncStart())
       
        const unsubscribe = query().onSnapshot(
            snapshot => {
                if(!snapshot.exists){
                    dispatch(asyncError({code:' not-found', message: 'Could Not Find the Damn Document'}))
                    return;
                }
                data(dataFromSnapshot(snapshot));
                dispatch(asyncFinish())
            },
            error => dispatch(asyncError(error))
        )
     return () => {
            unsubscribe()
}
 }, deps) //eslint-disable-line react-hooks/exhaustive-deps
}