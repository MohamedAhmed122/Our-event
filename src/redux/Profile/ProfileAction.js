import{ LISTEN_TO_CURRENT_USER_PROFILE, LISTEN_TO_SELECTED_USER_PROFILE, LISTEN_TO_USER_PHOTO} from './ProfileType'



export const listenToCurrentUserProfile=(profile)=>({
    type: LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile
}) 


export const listenToSelectedUserProfile =(profile) =>({
    type: LISTEN_TO_SELECTED_USER_PROFILE,
    payload: profile
})

export const listenToUserPhoto=(photo) =>({
    type: LISTEN_TO_USER_PHOTO,
    payload: photo
})