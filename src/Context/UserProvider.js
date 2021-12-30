import { createContext, useState, useEffect } from 'react';

export const UserData = createContext({});

const UserProvider = ({ children }) => {
    const [userSignup, setUserSignUpData] = useState({});
    const [verification, setVerification] = useState("");
    const [userData, setUserData] = useState({});
    const [navigation, setNavigation] = useState("");
    const [firstLogin, setFirstLogin] = useState(false);
    const [coins, setCoins] = useState(null);

    const setUserSignUp = (data) => {
        setUserSignUpData(data);
    }

    const setDataUser= async (data) => {
        const user = data.data;
        localStorage.setItem('userBP', JSON.stringify(user))
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
            const user =JSON.parse(localStorage.getItem('userBP'))
            if (user) {
                setUserData(user);
            }
        })()
        return () => {

        }
    }, [])

    return (
        <UserData.Provider value = {{setUserSignUp, setDataUser, setCodeVerification, setPreviousNav, setLoginFirst, setCoin, verification, userSignup, userData, navigation, firstLogin, coins}}>
            {children}
        </UserData.Provider>
    )
}

export default UserProvider;