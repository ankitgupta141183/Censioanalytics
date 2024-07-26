import "./config";
import axios from "axios";
var apiUrl = global.platformURI;

// console.log("API URl Path----", apiUrl);

export const authServices = {
  userLogin,
  userSignUp,
  userSignUpUpdate,
  userForgotPassword,
  resetPassword,
  userLoginConfirm,
  userSignInWithCode,
  socialLogin,
  emailExist
};

function userLogin(payload ) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: payload }),
    // params:  param
  };
  return fetch(apiUrl + "/api/v1/users/sign_in", requestOptions)
  .then(handleResponse)
  .then(user => {
    return user;
  });
}

function userLoginConfirm(payload) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch(apiUrl + `/api/v1/users/confirmation?confirmation_token=${payload}`, requestOptions)
  .then(handleResponse)
  .then(user => {
    return user;
  });
}

function userForgotPassword(payload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: payload })
  };
  return fetch(apiUrl + "/api/v1/users/password", requestOptions)
  .then(handleResponse)
  .then(user => {
    return user;
  });
}

function userSignUp(payload) {
  const requestOptions = {
    method: 'POST',
    body: payload
  };
  return fetch(apiUrl + "/api/v1/users", requestOptions)
  .then(handleResponse)
  .then(user => {
    return user;
  });
}

function userSignUpUpdate(payload) {
  const requestOptions = {
    method: 'PUT',
    body: payload
  };
  return fetch(apiUrl + `/api/v1/users/${sessionStorage.getItem("uuid")}`, requestOptions)
  .then(handleResponse)
  .then(user => {
    return user;
  });
}

function userSignInWithCode(payload) {
  // console.log(payload, "this is payload");
  return axios.get(apiUrl + `/api/v1/register_codes/match_code?code=${payload}`).then(response => {  return response })
}

function resetPassword(payload, token) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: payload })
  };
  return fetch(apiUrl + `/api/v1/users/password`, requestOptions)
  .then(handleResponse)
  .then(user => {
    return user;
  });
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
      }
      const error = (data) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

function socialLogin(payload) {
  const requestOptions = {
    method: 'POST',
    body: payload
  };
  return fetch(apiUrl + "/api/v1/social_login", requestOptions)
  .then(handleResponse)
  .then(user => {
    return user;
  });
}

function emailExist(payload) {
  return fetch(apiUrl + `/api/v1/users/verify_email?email=${payload}`)
  .then(handleResponse)
  .then(user => {
    return user;
  });
}
