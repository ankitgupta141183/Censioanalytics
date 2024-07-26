import { fetchGamesReportStatus } from '../../Actions/GamesReportsStatusActions/GamesReportsStatusActions'
import "../config";
import axios from "axios";
var apiUrl = global.platformURI;


export const fetchGamesPercentages = async () => {
    try {
        let data = await axios.get(apiUrl + `/api/v1/games/games_percentage`)
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


export const fetchGamesReportsStatus = (gamesId) => {
  
    return async (dispatch) => {
        try {
            let data = await axios.get(apiUrl + `/api/v1/games/report_pdf?game_id=${gamesId}`)
                dispatch(fetchGamesReportStatus(data))
            return {
                data: data?.data,
                status: data?.status
            }
        }
        catch (error) {
            return {
                message: 'somthing went wrong.',
                status: 500,
                error:error
            }
        }
    }
}