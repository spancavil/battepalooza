import axios from "axios";

const API_URL = "http://localhost:8080/api/";

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

  register(username, email, name, lastName, role) {
    return axios.post(API_URL + "user/create", {
      username,
      email,
      name,
      lastName,
      role: role ? role : "user"
    });
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