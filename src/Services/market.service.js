import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class marketService {
    async getData(){
        return await axios.post(API_URL + "market/data")
        .then (response => {
            return response.data
        })
    }
}

export default new marketService();
