export default function questionListReducer(state ={
    questionList: false,
    isSessionExpired: false,
    reviewList: false,
    assesmentList: false,
    allQuestionsData:false
}, action) {
    // console.log(state.questionList)
    switch (action.type) {
        case 'FETCH_ALL_QUESTION':
            return {
                questionList: action.payload            
            };
        case 'FETCH_SESSION_EXPIRED':
            return {
                isSessionExpired: action.payload     
            };  
        case 'FETCH_ALL_QUESTION_REVIEW':
            return {
                reviewList: action.payload     
            };  
        case 'FETCH_ALL_ASSESMENT':
            return{
                assesmentList: action.payload
            }
        case 'GET_ALL_QUESTIONS_BY_ID':
            return{
                allQuestionsData:action.payload
            }

        default:
            return state;
    }

}
