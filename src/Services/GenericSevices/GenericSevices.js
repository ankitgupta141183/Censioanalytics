import "../config";
import axios from "axios";
var apiUrl = global.platformURI;


export const fethcAllGenericDemographic = async () => {
    try {
        let data = await axios.get(apiUrl + `/api/v1/generic_questions/demographic_questions`)
        // dispatch(fetchAssessmentMurkQuestions(data.data))    // fetch Data for questionlist
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


export const fetchFeedBackAndQuestionsData = (groupByParam) => {
    return async (dispatch) => {
        try {
            let data = await axios.get(apiUrl + `/api/v1/generic_questions?group=${groupByParam}`)
            // dispatch(fetchAssessmentMurkQuestions(data.data))    // fetch Data for questionlist
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


export const submitGenericQuestionsDemographics = async (payload, groupByPayload) => {
    try {
        let data = await axios.post(apiUrl + '/api/v1/generic_responses', { generic_response: payload, ...groupByPayload })
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