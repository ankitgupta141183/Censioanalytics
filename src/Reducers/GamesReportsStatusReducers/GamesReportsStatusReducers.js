const initialState = {
    reportsStatus:[],
}
export  function gamesReportsStatusReducers(state=initialState,action){
    switch (action.type) {
        case 'FETCH_GAMES_REPORTS_STATUS':
            return{
                ...state,
                reportsStatus:action.payload
            }
        default:
            return state
    }
}