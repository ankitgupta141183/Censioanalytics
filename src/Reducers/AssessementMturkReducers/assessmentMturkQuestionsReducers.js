
const initialState = {
    mturkData:[],
}
export function assessmentMturkQuestionsReducers(state=initialState,action){
    switch (action.type) {
        case 'FETCH_MTURK_SURVEY_QUESTIONS':
            return{
                ...state,
                mturkData:action.payload
            }
        default:
            return state
    }
}