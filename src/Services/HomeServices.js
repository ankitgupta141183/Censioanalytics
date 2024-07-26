import axios from "axios";
import "./config";

var apiUrl = global.platformURI;

export class HomeServices {
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

  getProfileDetail() {
    return axios
      .get(apiUrl + `/api/v1/users/fetch_user`)
      .then((res) => res.data);
  }
  userUpdateProfile(payload, uuid) {
    var id = sessionStorage.getItem("uuid")
    if (uuid !== undefined) {
      id = uuid
    }
    else {
      id =sessionStorage.getItem('uuid')
   
    }
    return axios
      .put(apiUrl + `/api/v1/users/${id}`, payload)
      .then((res) => res.data);
  }

}
