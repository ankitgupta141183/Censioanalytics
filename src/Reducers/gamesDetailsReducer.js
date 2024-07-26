import { GameStaticData } from '../StaticData/GameStaticData'

export default function gamesDetailsReducer(state = {
    games: GameStaticData
}, action) {
    switch (action.type) {
        case "SET_GAME_DATA":
            return {
                ...state,
                games: action.payload
            }

        default: return state
    }
}
