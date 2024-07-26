import "../Services/config";
import { HomeServices } from "../Services/HomeServices";
import { showNotification } from "../Actions/componentActions";
import { SignatureExpired } from "./AuthAction";


// var apiUrl = global.platformURI;

let homeServices = new HomeServices();

export function getProfileDetail() {
  return dispatch => {
    return homeServices.getProfileDetail()
      .then(
        response => {
          return dispatch(getProfileSuccess(response));
        },
        error => {
          if(error.message === "Request failed with status code 401"){
            dispatch(SignatureExpired(error.message))
            // dispatch(getProfileSuccess(false)),
            dispatch({
              type: 'FETCH_SESSION_EXPIRED',
              payload: error.response.data.errors
            })
          }
        }
      );
  }
}

export function userUpdateProfile(data, id) {
 
  return dispatch => {
    return homeServices.userUpdateProfile(data,id)
      .then(
        response => {
          if(id===''){
          // sessionStorage.setItem("profileImage", response.data.user.user_image)
          // sessionStorage.setItem("userName", `${response.data.user.first_name} ${response.data.user.last_name}`)
          }
          console.log("THIS IS RESPONSE::::",response)
          if(response?.status === 200){
          // sessionStorage.setItem("profileImage", response.data.user.user_image)

          }
          dispatch(showNotification(true, response.message ? response.message : "Successful !!!", "success"))
          
         
          return dispatch(updateProfileSuccess(response));
          // return dispatch(updateProfileSuccess({profileUpdate: response.status === 200 , data : response?.data?.user}));
        },
        error => {
        
          dispatch(showNotification(true, error.response.data.messages))

        }
      );
  }
}

export function getProfileSuccess(res) {
  return {
    type: "FETCH_PROFILE",
    payload: res
  }
}
export const updateProfileSuccess = (res) => {
  return {
    type: "UPDATE_PROFILE",
    payload: res
  }
}