const initialState = {
    surveyData:[],
}
export default function surveyQuestionsReducers(state=initialState,action){
    switch (action.type) {
        case 'FETCH_SURVEY_QUESTIONS':
            return{
                ...state,
                surveyData:action.payload
            }
        default:
            return state
    }
}