
export const fetchAssessmentMurkQuestions  = (payload) =>{
    return{
        type:'FETCH_MTURK_SURVEY_QUESTIONS',
        payload:payload
    }
}