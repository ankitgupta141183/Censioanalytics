
import { QuestionServices } from "../Services/QuestionServices";


let questionServices = new QuestionServices();

export function getQuestionList(id) {
    return dispatch => {
        return  questionServices.getquestionListById(id)
            .then(
                response => {
                    return dispatch(getQuestionListSuccess(response));
                },
                error => {
                  if(error.response.data.errors === "Signature has expired"){
                    sessionStorage.clear()
                    return dispatch(sessionExpired(error.response.data.errors))
                  }
                    console.log(error)
                }
            );
    }
  }

  // export function getQuestionList() {
  //   return dispatch => {
  //       return questionServices.getAllCategoryQuestion()
  //           .then(
  //               response => {
  //                   return dispatch(getQuestionListSuccess(response));
  //               },
  //               error => {
  //                 if(error.response.data.errors === "Signature has expired"){
  //                   sessionStorage.clear()
  //                   return dispatch(sessionExpired(error.response.data.errors))
  //                 }
  //                   console.log(error)
  //               }
  //           );
  //   }
  // }
  export function getReviewQuestion(id) {
    return dispatch => {
        return questionServices.getReviewQuestion(id)
            .then(
                response => {
                    return dispatch(getReviewQuestionSuccess(response));
                },
                error => {
                  if(error.response && error.response.data.errors === "Signature has expired"){
                    sessionStorage.clear()
                    return dispatch(sessionExpired(error.response.data.errors))
                  }
                    console.log(error)
                }
            );
    }
  }

  export function getAllAssesment() {
    return dispatch => {
        return questionServices.getAllAssesment()
            .then(
                response => {
                    return dispatch(getAllAssesmentSuccess(response));
                },
                error => {
                  if(error.response && error.response.data.errors === "Signature has expired"){
                    sessionStorage.clear()
                    return dispatch(sessionExpired(error.response.data.errors))
                  }
                    console.log(error)
                }
            );
    }
  }

  function getQuestionListSuccess(res){
      return {
        type: "FETCH_ALL_QUESTION",
        payload: res
      }
  }

  function getAllAssesmentSuccess(res){
    return {
      type: "FETCH_ALL_ASSESMENT",
      payload: res
    }
}

  function getReviewQuestionSuccess(res){
    return {
      type: "FETCH_ALL_QUESTION_REVIEW",
      payload: res
    }
}

export function sessionExpired (res){
  return {
    type: 'FETCH_SESSION_EXPIRED',
    payload: res
  }
}

export function getAllQuestionsById (res){
  return {
    type: 'GET_ALL_QUESTIONS_BY_ID',
    payload: res
  }
}
