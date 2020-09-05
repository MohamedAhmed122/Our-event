import{
LISTEN_TO_CURRENT_USER_PROFILE, 
LISTEN_TO_SELECTED_USER_PROFILE, 
LISTEN_TO_USER_PHOTO, 
LISTEN_TO_USER_EVENT, 
LISTEN_TO_FOLLOWERS, 
LISTEN_TO_FOLLOWING, 
SET_FOLLOW_USER, 
SET_UNFOLLOW_USER} from './ProfileType'



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

export const listenToUserEvent =(event)=>({
    type: LISTEN_TO_USER_EVENT,
    payload: event
})

export const listenToFollowers =(followers)=>({
    type: LISTEN_TO_FOLLOWERS,
    payload: followers
})

export const listenToFollowing =(following)=>({
    type: LISTEN_TO_FOLLOWING,
    payload: following
})

export const setFollowUser =()=>({
    type: SET_FOLLOW_USER
}) 

export const setUnFollowUser =()=>({
    type: SET_UNFOLLOW_USER
}) 