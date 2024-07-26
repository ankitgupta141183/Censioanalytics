import "../config";
import axios from "axios";
var apiUrl = global.platformURI;


export const fetchAllAdminSurveyData = async (url) => {
    try {
        let data = await axios.get(apiUrl + url)
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

export const fetchAllAdminGamesData = async (url) => {
    try {
        // let data = await axios.get(apiUrl + `/api/v1/game_data?filter_game_data[game_id]=${gameId}&&page=${currentPage}`)
        let data = await axios.get(apiUrl + url)
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