import { createContext, useState, useEffect } from 'react';
import image1 from '../Assets/sprites/cardpack01.png';
import image2 from '../Assets/sprites/cardpack02.png';
import image4 from '../Assets/sprites/cardpack04.png';

export const CardData = createContext({});

const CardDataProvider = ({children}) => {
    const [packs, setPacks] = useState([]);
    const [packSelected, setPackSelected] = useState({});

    const setPack = (pack) => {
        setPackSelected(pack);
    }

    useEffect(() => {
        //Cards hardcoded
        setPacks(
            [
                {
                    id: 1,
                    imgSrc: image1,
                    description : {
                        text1: "Rare Series 1 Release",
                        text2: "1 - DROP 1",
                        text3: "2,00 PACK",
                    },
                    content: ["1 rare skin", "2 common skin"],
                    price: 100000,
                    stock: 300,
                    soldOut: false,
                    sale: true
                },
                {
                    id: 2,
                    imgSrc: image2,
                    description : {
                        text1: "Rare Series 1 Release",
                        text2: "1 - DROP 1",
                        text3: "2,00 PACK",
                    },
                    content: ["1 rare skin", "2 common skin"],
                    price: 200000,
                    stock: 255,
                    soldOut: true,
                    sale: false
                },
                {
                    id: 4,
                    imgSrc: image4,
                    description : {
                        text1: "Rare Series 1 Release",
                        text2: "1 - DROP 1",
                        text3: "2,00 PACK",
                    },
                    content: ["1 rare skin", "2 common skin"],
                    price: 300000,
                    stock: 450,
                    soldOut: false,
                    sale: false
                },
            ])

    }, [])

    return (
        <CardData.Provider value = {{setPack, packs, packSelected}}>
            {children}
        </CardData.Provider>
    )
}

export default CardDataProvider;
