import axios from "axios";
import authHeader from "./auth-header";

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

  validateUser({userId, token}){
    
    const header = authHeader(token);
    return axios.get(`${API_URL}user?id=${userId}`, {headers: header});
  }

  getVerificationCode(email){
    return axios.post(API_URL + "login/verify-code", {
      email
    }).then( response => {
      //console.log(response.data)
      return response.data;
    })
  }
}

export default new AuthService();