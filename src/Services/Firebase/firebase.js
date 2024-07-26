// import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "semantic-ui-css/semantic.min.css";
// import { Link, useHistory } from "react-router-dom";
import { authServices } from "../../Services/Auth";
import axios from 'axios';
// import { checkRegistrationCompleted } from '../../Actions/AuthAction';
// import { useSelector, useDispatch } from 'react-redux';
// import { showNotification } from "../../Actions/componentActions";


export const firebaseConfig = {
  apiKey: "AIzaSyBmgaVDp9ONEwBNV3GU1EuNrq0hUOPd0HU",
  authDomain: "censio-analytics.firebaseapp.com",
  projectId: "censio-analytics",
  storageBucket: "censio-analytics.appspot.com",
  messagingSenderId: "68184308256",
  appId: "1:68184308256:web:630e7130af0669c50b9a45",
  measurementId: "G-ED3VQJJLDN"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const SignInWithGoogle = () => {

  
  signInWithPopup(auth, provider)
    .then((result) => {

      var user = {
        provider: result.providerId === "google.com" ? "google" : result.providerId === "facebook.com" ? "facebook" : "linkedin",
        social_uid: result.user.uid,
        email : result.user.email,
        full_name:result.user.displayName,
        role : "user"


      };
      authServices.userLogin(user).then(
        (data) => {
          if (data.status === 200) {
            axios.defaults.headers.common['Authorization'] = `${data.data.token}`;
            sessionStorage.setItem("ssoToken", data.data.token);
            // sessionStorage.setItem("profileImage", data.data.user.user_image)
            sessionStorage.setItem("userName", `${data.data.user.first_name} ${data.data.user.last_name}`)
            sessionStorage.setItem("isLogin", true);
            sessionStorage.setItem("uid", data.data.user.id)
            sessionStorage.setItem("uuid", data.data.user.uuid)


            sessionStorage.setItem("userData", JSON.stringify(data.data.user))
            sessionStorage.setItem("registration_completed", data.data.user.registration_completed === true ? true : false)


            sessionStorage.setItem("email", data.data.user.email)
            sessionStorage.setItem('isAdmin', data.data.user.admin)

            // data.data.user.admin ? history.push("/admin") : history.push("/dashboard")

          } else {
          }
        },
        (error) => {
          console.log("error.response.status", error);
        }
      );


    })
    .catch((error) => {
      console.log(error);
    });
};