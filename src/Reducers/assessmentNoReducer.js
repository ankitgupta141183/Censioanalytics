export default function assessmentNoReducer(state = {assessementNo: 1 , gameToShow:"the_gold_mine"}, action) {
    // console.log("adjfhajdshfj", action)
    switch (action.type) {
        case "UPDATE_ASSESSEMENT_NUMBER":
            return {
                ...state,
                // gameToShow:action.payload
                assessementNo: action.payload
            }
        case "RESET_ASSESSEMENT_NUMBER":
            return {
                ...state,
                // gameToShow:action.payload
                assessementNo: action.payload
            }

        default: return state
    }

}
