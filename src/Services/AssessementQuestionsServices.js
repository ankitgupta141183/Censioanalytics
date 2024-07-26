import { fetchAssessmentMurkQuestions } from '../Actions/AssessmentMturkActions/AssessmentMturkActions'
import axios from "axios";
import "./config";
var apiUrl = global.platformURI;
export const submitEachAnswer = async (payload) => {
    try {
        let data = await axios.post(apiUrl + '/api/v1/assessments/assess_response', { assessment_game_response: payload })
        let status = await data?.data?.status
        return status
    }
    catch (error) {
        return error
    }
}


export const sendCollegeStatus = async (payload) => {
    try {
        let data = await axios.post(apiUrl + '/api/v1/', { enrollment_status: payload })
        let status = await data?.data?.status
        return status
    } catch (error) {
        return error
    }
}

export const fetchAllMurkDemographicsQuestions = async () => {
    try {
        let data = await axios.get(apiUrl + `/api/v1/mturk_questions/demographic_questions`)
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


export const fetchAllMturkFeedBackQuestions = async () => {
    try {
        let data = await axios.get(apiUrl + `/api/v1/feedbacks`)
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

export const fetchMturkAllSurveyQuestions = (groupByParam) => {
    return async (dispatch) => {
        try {
            let data = await axios.get(apiUrl + `/api/v1/mturk_questions?group=${groupByParam}`)
            dispatch(fetchAssessmentMurkQuestions(data.data))    // fetch Data for questionlist
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

export const submitMturkQuestionsDemographics = async (payload, groupByPayload) => {
    try {
        let data = await axios.post(apiUrl + '/api/v1/mturk_responses', { mturk_response: payload, ...groupByPayload })
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

export const callingToSendGamesCompleted = async (gamesData , url) => {
    try {
        let data = await axios.patch(apiUrl + `/api/v1/games/game_completed_status`,{data:gamesData, redirectionUrl: url})
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