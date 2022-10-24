import EncryptRsa from "encrypt-rsa";
/**
 * 
 * @param {*} tokenEncrypted The encrypted user with RSA public key
 * @returns decrypted token using RSA private key
 */
export default function decryptUserToken (tokenEncrypted) {
    //Decrypt token using RSA private key
    try {
        const privKey = process.env.REACT_APP_FRONT_PRIVKEY.replace(/\\n/g, '\n')
        console.log(privKey);
        console.log(tokenEncrypted);
        const encryptRsa = new EncryptRsa();
        const bpTokenUncrypted = encryptRsa.decryptStringWithRsaPrivateKey({ 
            text: tokenEncrypted,
            privateKey: privKey,
        });
        return bpTokenUncrypted
    } catch (error) {
        console.log(error);
        return null
    }
} 