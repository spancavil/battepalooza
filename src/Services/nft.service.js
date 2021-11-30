import axios from 'axios';

class nftService {
    async getNfts(){
        return await axios.get('./user.service.js')
    }
}

export default new nftService ()