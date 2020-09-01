import{ LISTEN_TO_CURRENT_USER_PROFILE, LISTEN_TO_SELECTED_USER_PROFILE,LISTEN_TO_USER_PHOTO, LISTEN_TO_USER_EVENT} from './ProfileType'


const initialState = {
    currentUserProfile: null,
    selectedUserProfile: null,
    photos:[],
    events:[]
   
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
        default: {
            return state;
        }
    }
}
export default  profileReducer