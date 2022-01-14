//import axios from 'axios';
import dataNft from './nftList';
import authHeader from "./auth-header";
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class nftService {
    async getNfts(){
        return dataNft;
    }
    async getNftCollection({bpToken, pid}){
        const bpTokenHeader = authHeader(bpToken);
        return await axios.post(API_URL + "user/collection", {
            bpTokenHeader,
            pid
        }).then (response => {
            return response.data
        })
    }
    async getNftCollectionDetail(bpToken, pid, uuid){
        console.log(bpToken, pid, uuid);
        const bpTokenHeader = authHeader(bpToken);
        return await axios.post(API_URL + "user/collection-detail", {
            bpTokenHeader,
            pid,
            uuid
        }).then (response => {
            return response.data
        })
    }
}

export default new nftService ()