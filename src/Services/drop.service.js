import axios from "axios";
import authHeader from "./auth-header";
// import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class DropService {
    async getDrops (){
        return await axios.post(API_URL + "drops")
        .then (response => {
            return response.data
        })
    }

    async getDropDetail(pid, dropId){
        return await axios.post(API_URL + "drops/detail",{
            pid,
            dropId
        }).then(response => {
            return response.data
        })
    }
    async payCoin (pid, productId, bpTokenContent, quantity = 1){
        console.log(quantity);
        const bpToken = authHeader(bpTokenContent);
        return await axios.post(API_URL + "drops/pay-coin-nft",{
            bpToken,
            productId,
            pid,
            quantity
        }).then(response => {
            return response.data
        })
    }
    async buyShop (payForteTxId, pid, bpTokenContent){
        const bpToken = authHeader(bpTokenContent);
        return await axios.post(API_URL + "drops/buy-shop-nft",{
            bpToken,
            payForteTxId,
            pid
        }).then(response => {
            return response.data
        })
    }

    async getTransactionStatus (pid, forteTxId, bpTokenContent){
        const bpToken = authHeader(bpTokenContent);
        return await axios.post(API_URL + "drops/txstatus", {
            bpToken,
            pid,
            forteTxId
        }).then(response => {
            return response.data
        })
    }
}

export default new DropService();