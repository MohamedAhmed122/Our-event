import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { asyncStart, asyncFinish, asyncError } from "../../redux/Async/AsyncAction"
import { dataFromSnapshot } from "../firestoreService"



export const useFirestoreCollection=({query, data,deps})=>{

 const dispatch = useDispatch()

 useEffect(() => {
        dispatch(asyncStart())
        const unsubscribe = query().onSnapshot(
            snapshot => {
                const docs = snapshot.docs.map(doc => dataFromSnapshot(doc))
                data(docs);
                dispatch(asyncFinish())
            },
            error => dispatch(asyncError(error))
        )
     return () => {
            unsubscribe()
}
 }, deps) //eslint-disable-line 
}