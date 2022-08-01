import authHeader from "./auth-header";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class walletService {
    async getWalletToken(bpToken, email, pid, productId="drop-14-293") {
        const bpTokenHeader = authHeader(bpToken);
        return await axios.post(API_URL + 'user/get-wallet-payment-token', {
            bpTokenHeader,
            pid,
            email,
            productId
        }).then(response => {
            return response.data
        });
    }

    async getWalletCryptoTransactions(bpToken, pid, limit = 10, page = 1) {
        const bpTokenHeader = authHeader(bpToken);
        return await axios.post(API_URL + 'user/get-wallet-crypto-transactions', {
            bpTokenHeader,
            pid,
            limit,
            page
        }).then(response => {
            return response.data
        });
    }
}

export default new walletService()
