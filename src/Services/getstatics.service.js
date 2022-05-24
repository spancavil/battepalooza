import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class StaticsService {
    async getNftData(){
        return await axios.get(API_URL + 'static/nft-data')
            .then(response => {
                return response.data
            })
    }

    async getClans(){
        return await axios.get(API_URL + 'static/clans')
            .then(response => {
                return response.data
            })
    }

    async getRarity(){
        return await axios.get(API_URL + 'static/rarity')
            .then(response => {
                return response.data
            })
    }

    async getRepId(){
        return await axios.get(API_URL + 'static/rep-id')
            .then(response => {
                return response.data
            })
    }

    async getPremium(){
        return await axios.get(API_URL + 'static/premium')
            .then(response => {
                return response.data
            })
    }
}

export default new StaticsService();
