import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class marketService {
    async getData(){
        return await axios.post(API_URL + "market/data")
        .then (response => {
            return response.data
        })
    }

    async getNftMarketplaceList(){
        return await axios.post(API_URL + "market/list").then (response => {
            return response.data
        })
    }

    async getNftMarketplaceDetail(seller, uniqueId){
        return await axios.post(API_URL + "market/detail",{
            uniqueId,
            seller
        }).then(response => {
            return response.data
        })
    }
}

export default new marketService();
