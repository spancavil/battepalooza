import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;
const BP_FORTE_PAYLOAD = process.env.REACT_APP_BP_FORTE_PAYLOAD;

class AuthService {
  login(username, code, endpoint) {
    return axios
      .post(API_URL + `login${endpoint}`, {
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

  register(name, lastName, email, getMails, role) {
    return axios.post(API_URL + "user/create", {
      name,
      lastName,
      email,
      getMails,
      role: role ? role : "user",
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

  verifyCaptcha(captchaToken){
    return axios.post(`${API_URL}user/verify-recaptcha`, {
      captchaToken
    }).then( response => {
      if (response.data) return response.data
    })
  }

  getVerificationCode(email){
    return axios.post(API_URL + "login/verify-code", {
      email
    }).then( response => {
      return response.data;
    })
  }

  getFortePayload({bpToken, pid}){
    const header = authHeader(bpToken);
    return axios.post(BP_FORTE_PAYLOAD, {pid}, {headers: header})
  }
}

export default new AuthService();