//import axios from 'axios';
import dataNft from './nftList'

class nftService {
    async getNfts(){
        return dataNft;
    }
}

export default new nftService ()