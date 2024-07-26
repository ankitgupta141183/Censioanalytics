export default function authReducer(state = {
    emailExistErr: false,
    SIGNATURE_EXPIRED: ""
}, action) {
    // console.log("adjfhajdshfj", action)
    switch (action.type) {
        case "EMAIL_EXIST":
            return {
                ...state,
                emailExistErr: action.payload
            }
        case "SIGNATURE_EXPIRED":
            return {
                ...state,
                SIGNATURE_EXPIRED: action.payload
            }

        default: return state
    }

}
