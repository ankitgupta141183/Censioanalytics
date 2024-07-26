import "../config";
import axios from "axios";
var apiUrl = global.platformURI;

export const sendEmailDetails = async (emailData) => {
    try {
        let data = await axios.post(apiUrl + `/api/v1/games/send_report_email`,{mail_details:emailData})
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