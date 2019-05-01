import axios from "axios";

export default {
  setAuthToken: function(token) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  },
  login: function(loginData) {
    return axios.post("/api/users/login/", loginData);
  },
  register: function(registerData) {
    return axios.post("/api/users/register/", registerData);
  },
  getProfile: function() {
    return axios.get("/api/current/");
  }
};
