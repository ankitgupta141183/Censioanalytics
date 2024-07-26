import "../config";
import axios from "axios";
var apiUrl = global.platformURI;


export const fetchAllStudentTableRecord = async (body) => {
    let url ;
    try {
        if(body === false){
            url = '/api/v1/user_reports'
        }else{
            url = `/api/v1/user_reports?filter_data=${body}`
        }
        // let data = await axios.get(apiUrl + `/api/v1/user_reports?filter_data=${body}`)
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

export const fetchGraphDetails = async () => {
    try {
        let data = await axios.get(apiUrl + `/api/v1/admin_dashboard`)
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




