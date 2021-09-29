import axios from "axios";

const API_URL = "https://be-battlepalooza.herokuapp.com/api/";

class AuthService {
  login(username, code) {
    console.log(username, code)
    return axios
      .post(API_URL + "login", {
          email: username,
          code
      })
      .then(response => {
        if (response.data) {
          return response.data;
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, lastName, email, role) {
    return axios.post(API_URL + "user/create", {
      name,
      lastName,
      email,
      role: role ? role : "user"
    })
    .then( response => {
      if (response.data) {
        return (response.data)
        }
      }
    );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getVerificationCode(email){
    axios.post(API_URL + "login/verify-code", {
      email
    }).then( response => {
      console.log (response.data)
      return response.data;
    })
  }
}

export default new AuthService();