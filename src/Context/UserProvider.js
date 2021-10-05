import { createContext, useState, useEffect } from 'react';
import authService from '../Services/auth.service';
import image1 from '../Assets/sprites/cardpack01.png';
import image2 from '../Assets/sprites/cardpack02.png';
import image4 from '../Assets/sprites/cardpack04.png';

export const UserData = createContext({});

const UserProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [verification, setVerification] = useState("");
    const [userToken, setUserToken] = useState({});
    const [userData, setUserData] = useState({});
    const [packs, setPacks] = useState([]);
    const [packSelected, setPackSelected] = useState({});

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

    const setPack = (packId) => {
        const pack = packs.find(pack => pack.id === packId);
        setPackSelected(pack);
    }

    useEffect( () => {
        (async () => {
            const user =JSON.parse(localStorage.getItem('user'))
            if (user) {
                setUserToken(user);
                const response = await authService.validateUser(user);
                setUserData({...response.data.data});
            }

            //Cards hardcoded
            setPacks(
                [
                    {
                        id: 1,
                        imgSrc: image1,
                        text1: "Rare Series 1 Release",
                        text2: "1 - DROP 1",
                        text3: "2,00 PACK",
                        soldOut: false,
                        sale: true
                    },
                    {
                        id: 2,
                        imgSrc: image2,
                        text1: "Rare Series 1 Release",
                        text2: "1 - DROP 1",
                        text3: "2,00 PACK",
                        soldOut: true,
                        sale: false
                    },
                    {
                        id: 4,
                        imgSrc: image4,
                        text1: "Rare Series 1 Release",
                        text2: "1 - DROP 1",
                        text3: "2,00 PACK",
                        soldOut: false,
                        sale: false
                    },
                ]
            ) 
        })()
        return () => {

        }
    }, [])

    return (
        <UserData.Provider value = {{setMail, setTheToken, setCodeVerification, setPack, verification, email, userToken, userData, packs, packSelected}}>
            {children}
        </UserData.Provider>
    )
}

export default UserProvider;