


export default function gamesPercentageReducer(state = {gamesPercentages:[]}, action) {
    switch (action.type) {
        case "UPDATE_GAMES_PERCENTAGES":
            return {
                ...state,
                gamesPercentages: action.payload
            }
        default: return state
    }

}
