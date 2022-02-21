import axios from 'axios';
import authHeader from './auth-header';

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

    async registerProductMarketplace(pid, uuid, price, bpTokenContent){
        const bpToken = authHeader(bpTokenContent);

        return await axios.post(API_URL + 'market/register', {
            pid,
            uuid,
            price,
            bpToken
        }).then(response => {
            return response.data
        })
    }

    async buyProductMarketplace(pid, seller, uniqueId, bpTokenContent){
        const bpToken = authHeader(bpTokenContent);
        return await axios.post(API_URL + 'market/buy-product', {
            pid,
            seller,
            uniqueId,
            bpToken
        }).then(response => {
            return response.data
        })
    }

    async getTransactionStatus(pid, forteTxId, bpTokenContent){
        const bpToken = authHeader(bpTokenContent);
        return await axios.post(API_URL + 'market/tx-status', {
            pid,
            forteTxId,
            bpToken
        }).then(response => {
            return response.data
        })
    }

    async cancelSellingMarketplace(pid, uniqueId, bpTokenContent){
        const bpToken = authHeader(bpTokenContent);
        return await axios.post(API_URL + 'market/cancel-selling', {
            pid,
            uniqueId,
            bpToken
        }).then(response => {
            return response.data
        })
    }

    async requestWithdrawCoins(pid, uniqueId, bpTokenContent){
        const bpToken = authHeader(bpTokenContent);
        return await axios.post(API_URL + 'market/request-withdraw',{
            pid,
            uniqueId,
            bpToken
        }).then(response => {
            return response.data
        })
    }
}

export default new marketService();
