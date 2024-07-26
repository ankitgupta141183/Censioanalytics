import "../config";
import axios from "axios";
var apiUrl = global.platformURI;

export const fetchAllFeedBackQuestions = async () => {
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


export const submitFeedbackQuestions = async (payload) => {
    try {
        let data = await axios.post(apiUrl + '/api/v1/save_feedback', { feedback_response: payload })
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