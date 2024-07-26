import axios from "axios";
import "./config";

var apiUrl = global.platformURI;

export class QuestionServices {
  constructor() {
    axios.interceptors.request.use(
      function (config) {
        let token = sessionStorage.getItem("ssoToken");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        console.log("error.response.status", error);
        return error;
      }
    );
  }
  getAllCategoryQuestion(page) {
    return axios
      .get(apiUrl + `/api/v1/question_lists`)
      .then((res) => res.data);
  }
  getAllAssesment() {
    return axios
      .get(apiUrl + `/api/v1/assessments`)
      .then((res) => res.data);
  }
  submitQuestionAnswer(payload){
  
    return axios
    .post(apiUrl + `/api/v1/answers`, {answer: payload})

    .then((res) => res.data);
  }
  getReviewQuestion(id) {
    return axios
    .get(apiUrl + `/api/v1/last_answered_question?assessment_id=${id}`)
      .then((res) => res.data);
  }
  getquestionListById(id){
    return axios
    .get(apiUrl + `/api/v1/questions?assessment_id=${id}`)
  }
}
