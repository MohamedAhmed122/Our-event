import{ 
    LISTEN_TO_CURRENT_USER_PROFILE, 
    LISTEN_TO_SELECTED_USER_PROFILE,
    LISTEN_TO_USER_PHOTO, 
    LISTEN_TO_USER_EVENT, 
    LISTEN_TO_FOLLOWERS, 
    LISTEN_TO_FOLLOWING,
    SET_FOLLOW_USER, 
    SET_UNFOLLOW_USER
} from './ProfileType'


const initialState = {
    currentUserProfile: null,
    selectedUserProfile: null,
    photos:[], 
    events:[],
    followers: [],
    following:[],
    isFollowing: false

};

export const profileReducer =(state = initialState ,action) =>{
    switch (action.type) {
        case LISTEN_TO_CURRENT_USER_PROFILE:
            return {
            ...state,
            currentUserProfile: action.payload,
            };
        case LISTEN_TO_SELECTED_USER_PROFILE:
            return{
                ...state,
                selectedUserProfile : action.payload
            }
        case LISTEN_TO_USER_PHOTO:
            return{
                ...state,
                photos: action.payload
            }
        case LISTEN_TO_USER_EVENT:
            return{
                ...state,
                events: action.payload
            }
        case LISTEN_TO_FOLLOWERS:
            return{
                ...state,
                followers: action.payload
            }
        case LISTEN_TO_FOLLOWING:
            return{
                ...state,
                following:  action.payload
            }
        case SET_FOLLOW_USER:
            return{
                ...state,
                isFollowing: true
            }
        case SET_UNFOLLOW_USER:
            return{
                ...state,
                isFollowing: false
            }
        default: {
            return state;
        }
    }
}
export default  profileReducer