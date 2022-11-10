import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class PackService {
    async getNftPackInfo(pid) {
        return await axios.post(API_URL + "pack").then(response => {
            return response.data
        })
    }
    async getNowTimeFromServer(){
        return await axios.post(API_URL + "pack/now").then(response => {
            return response.data
        })
    }
}

export default new PackService();