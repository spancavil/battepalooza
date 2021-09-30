import { createContext, useState, useEffect } from 'react';
import authService from '../Services/auth.service';

export const UserData = createContext({});

const UserProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [verification, setVerification] = useState("");
    const [userToken, setUserToken] = useState({});
    const [userData, setUserData] = useState({});

    const setMail = (email) => {
        setEmail(email);
    }

    const setTheToken = async (data) => {
        const user = data.data
        localStorage.setItem('user', JSON.stringify(user))
        setUserToken(user);
        const response = await authService.validateUser(user);
        setUserData({...response.data.data});
    }

    const setCodeVerification = (code) => {
        setVerification(code);
    }

    useEffect( () => {
        (async () => {
            const user =JSON.parse(localStorage.getItem('user'))
            if (user) {
                setUserToken(user);
                const response = await authService.validateUser(user);
                setUserData({...response.data.data});
            }
        })()
        return () => {

        }
    }, [])

    return (
        <UserData.Provider value = {{setMail, setTheToken, setCodeVerification, verification, email, userToken, userData}}>
            {children}
        </UserData.Provider>
    )
}

export default UserProvider;