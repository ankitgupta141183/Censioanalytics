

export default function sidebarHoverReducer(state = {isHover: false}, action) {
    // console.log("adjfhajdshfj", action)
    switch (action.type) {
        case "TRUE_MOUSE_HOVER_SIDBAR":
            return {
                ...state,
                isHover: action.payload
            }
        case "FALSE_MOUSE_HOVER_SIDBAR":
            return {
                ...state,
                isHover: action.payload
            }

        default: return state
    }

}
