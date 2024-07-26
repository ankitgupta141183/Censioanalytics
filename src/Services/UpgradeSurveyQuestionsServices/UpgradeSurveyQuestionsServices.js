import { updateFetchSurveyQuestions } from '../../Actions/SurveyQuestionActions/SurveyQuestionsActions'
import "../config";
import axios from "axios";
var apiUrl = global.platformURI;

export const fetchAllSurveyQuestions = () => {
    return async (dispatch) => {
        try {
            let data = await axios.get(apiUrl + `/api/v1/survey_questions`)
            dispatch(updateFetchSurveyQuestions(data.data))    // fetch Data for questionlist
            return {
                data: data?.data,
                status: data?.status
            }
        }
        catch (error) {
            return {
                message: 'somthing went wrong.',
                status: 500
            }
        }
    }
}


export const fetchAllDemographicsQuestions = async () => {
    try {
        let data = await axios.get(apiUrl + `/api/v1/survey_questions/demographic_questions`)
        return {
            data: data?.data,
            status: data?.status
        }
    }
    catch (error) {
        return {
            message: 'somthing went wrong.',
            status: 500,
            error: error
        }
    }
}



export const submitDemographicsQuestions = async (payload , isfinalQuestion) => {
    try {
        let data = await axios.post(apiUrl + '/api/v1/survey_responses', { survey_response: payload  , final_ques:isfinalQuestion})
        return {
            data: data?.data,
            status: data?.status
        }

    }
    catch (error) {
        return {
            error: error,
            status: 500
        }
    }
}