import { createContext, useState, useEffect } from 'react';

export const UserData = createContext({});

const UserProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [verification, setVerification] = useState("");
    const [token, setToken] = useState("");

    const setMail = (email) => {
        setEmail(email);
    }

    const setTheToken = (data) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data))
        setToken(data);
    }

    const setCodeVerification = (code) => {
        setVerification(code);
    }

    useEffect( () => {
        (async () => {
            const data =JSON.parse(localStorage.getItem('userbp'))
            if (data) setToken(data.token);
        })()
        return () => {

        }
    }, [])

    return (
        <UserData.Provider value = {{setMail, setTheToken, setCodeVerification, verification, email, token}}>
            {children}
        </UserData.Provider>
    )
}

export default UserProvider;