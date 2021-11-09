import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  async login(username, code, endpoint, userData) {
    return await axios
      .post(API_URL + `login${endpoint}`, {
          email: username,
          code,
          userData
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

  async register(email, getMails, role) {
    console.log(email, getMails, role)
    const response = await axios.post(API_URL + "user/create", {
      email,
      getMails,
      role: role ? role : "user",
    })
    if (response.data) {
      return (response.data)
      }
  }

  validateUser({userId, token}){
    
    const header = authHeader(token);
    return axios.get(`${API_URL}user?id=${userId}`, {headers: header});
  }

  async verifyCaptcha(captchaToken){
    return await axios.post(`${API_URL}user/verify-recaptcha`, {
      captchaToken
    }).then( response => {
      if (response.data) return response.data
    })
  }

  async getVerificationCode(email){
    return await axios.post(API_URL + "login/verify-code", {
      email
    }).then( response => {
      return response.data;
    })
  }

  async getFortePayload({bpToken, pid}){
    const bpTokenHeader = authHeader(bpToken);
    return await axios.post(API_URL + "user/payload-forte", {
      bpTokenHeader,
      pid
    }).then ( response => {
      return response.data;
    })
  }

  async getForteBalance({bpToken, pid}){
    const bpTokenHeader = authHeader(bpToken);
    return await axios.post(API_URL + "user/forte-balance", {
      bpTokenHeader,
      pid
    }).then ( response => {
      return response.data;
    })
  }

}

export default new AuthService();