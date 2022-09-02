import { createContext, useState, useEffect } from 'react';

export const UserData = createContext({});

const UserProvider = ({ children }) => {
    const [userSignup, setUserSignUpData] = useState({});
    const [verification, setVerification] = useState("");
    const [userData, setUserData] = useState({});
    const [navigation, setNavigation] = useState("/");
    const [firstLogin, setFirstLogin] = useState(false);
    const [coins, setCoins] = useState(null);
    const [error404, setError404] = useState(false);

    const setUserSignUp = (data) => {
        setUserSignUpData(data);
    }

    const handleNavError404 = (flag) => {
        setError404(flag);
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
        <UserData.Provider value = {{setUserSignUp, setDataUser, setCodeVerification, setPreviousNav, setLoginFirst, setCoin, handleNavError404, error404, verification, userSignup, userData, navigation, firstLogin, coins}}>
            {children}
        </UserData.Provider>
    )
}

export default UserProvider;