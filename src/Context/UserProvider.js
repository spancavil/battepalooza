import { createContext, useState, useEffect } from 'react';
import decryptUserToken from '../Utils/decryptUserToken';

export const UserData = createContext({});

const UserProvider = ({ children }) => {

    const [userSignup, setUserSignUpData] = useState({});
    const [verification, setVerification] = useState("");
    const [userData, setUserData] = useState({});
    const [navigation, setNavigation] = useState("/");
    const [firstLogin, setFirstLogin] = useState(false);
    const [coins, setCoins] = useState(null);
    const [error404, setError404] = useState(false);
    const [gameNavigate, setGameNavigate] = useState(false);

    const setUserSignUp = (data) => {
        setUserSignUpData(data);
    }

    const handleNavError404 = (flag) => {
        setError404(flag);
    }

    const setDataUser= async (data) => {

        //The encrypted token
        //console.log(data.data.bpToken);
        const user = data.data;
        //Store de data with token encrypted
        localStorage.setItem('userBP', JSON.stringify(user))

        //In the state we use the token decrypted
        user.bpToken = decryptUserToken(user.bpToken)
        setUserData(user);
    }

    const setCodeVerification = (code) => {
        setVerification(code);
    }

    const setPreviousNav = (link) => {
        setNavigation(link);
    }

    const setLoginFirst = () => {
        setFirstLogin(true)
    }

    const setCoin = (coins) => {
        setCoins(coins)
    }

    useEffect( () => {
        (async () => {
            //Grab the token encrypted in user
            const user =JSON.parse(localStorage.getItem('userBP'))
            if (user) {
                //Decrypt de token
                const decrypted = decryptUserToken(user.bpToken)
                if (decrypted) {
                    user.bpToken = decrypted
                    setUserData(user);
                }
                //The decrypted was altered, then erase the whole key
                else {
                    localStorage.removeItem("userBP");
                }
            }
        })()

    }, [])

    return (
        <UserData.Provider value = {{setUserSignUp, setDataUser, setCodeVerification, setPreviousNav, setLoginFirst, setCoin, handleNavError404, setGameNavigate, gameNavigate, error404, verification, userSignup, userData, navigation, firstLogin, coins}}>
            {children}
        </UserData.Provider>
    )
}

export default UserProvider;