export default function ComponentReducer(state = {
    isToggle: false,
    showNotification: false,
    message: "",
    type: "",
    showgame:""
}, action) {
    switch (action.type) {
        case "TOGGLE_SIDEBAR":
            return {
                ...state,
                isToggle: action.payload
            }
        case "SHOW_NOTIFICATION":
            return {
                ...state,
                showNotification: action.payload.showNotice,
                message: action.payload.message,
                type: action.payload.type
            }

            case "SHOW_GAME":
            return {
                ...state,
                showgame : action.payload
            }
        default: return state
    }

}
