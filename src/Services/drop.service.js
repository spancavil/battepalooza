import axios from "axios";
// import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class DropService {
    async getDrops (){
        return await axios.post(API_URL + "drops")
        .then (response => {
            return response.data
        })
    }

    async getDropDetail(pid = "", dropId){
        return await axios.post(API_URL + "drops/detail",{
            pid,
            dropId
        }).then(response => {
            return response.data
        })
    }
}

export default new DropService();