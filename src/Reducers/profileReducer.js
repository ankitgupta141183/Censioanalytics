export default function profileReducer(state ={
    profileDetail: false,
    profileUpdate: false,
    isRegistered : sessionStorage.getItem("registration_completed"),
    emailExistErr : false
}, action) {
    // console.log("adjfhajdshfj", action)
    switch (action.type) {
        case 'FETCH_PROFILE':
            return {
                ...state,
                profileDetail: action.payload            
            };
        case 'UPDATE_PROFILE':
            return {
                ...state,
                profileUpdate: true,
                // profileUpdate: action.payload.profileUpdate,
                profileDetail: action.payload
            } 
        case "" :
            return {
                ...state,
                profileUpdate :  false
            }
        case 'REGISTER_COMPLETED':
            return {
                isRegistered : action.payload
            }

        case "REGISTER_SECOND":
            return {
                isRegistered : action.payload
            }

        default: return state
    }

}
