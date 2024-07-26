import "./config";
import axios from "axios";
var apiUrl = global.platformURI;

export const UserServices = {
    getAllUsers,
    orgData,
    AdminDashboard,
    getAssessmentStatus,
    getgameStatus,
    ResearchersUser,
    GameDataDelete,
    fetchAssessementUser
};

function getAllUsers() {
    return axios.get(apiUrl + `/api/v1/users` , {params : {assessment_user  : true}}).then(response => { return response }).catch((err => {return  err}))
}

function getAssessmentStatus(param){
    return axios.get(apiUrl + `/api/v1/users` , {params : {assessment_user  : true , assessment_status : param}}).then(response => { return response }).catch((err => {return  err}))
}

function getgameStatus(param){
    return axios.get(apiUrl + `/api/v1/users/get_users_by_game_status` , {params : {user_type : param}}).then(response => { return response }).catch((err => {return  err}))
}

function orgData() {
    return axios.get(apiUrl + `/api/v1/organisations`).then(response => { return response }).catch((err => {return err}))
}

function AdminDashboard(param){
    // /admin/dashboard
    return axios.get(apiUrl + `/api/v1/dashboard` , {params : {user_data_type : param}}).then(response => { return response }).catch((err => {return  err}))
}

function ResearchersUser() {
    return axios.get(apiUrl + `/api/v1/users/researcher_users`).then(response => { return response }).catch((err => {return  err}))
}


function GameDataDelete(user_id){    
    return axios.get(apiUrl + `/api/v1/users/delete_games_data/${user_id}`).then(response => { return response }).catch((err => {return  err}))
}


function fetchAssessementUser(uniqueId){
    return axios.get(apiUrl + `/api/v1/assessments/assess_user?unique_id=${uniqueId}`).then(response => { return response }).catch((err => {return  err}))
}