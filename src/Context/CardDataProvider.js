import { createContext, useState, useEffect } from 'react';
import image1 from '../Assets/sprites/cardpack01.png';
import image2 from '../Assets/sprites/cardpack02.png';
import image4 from '../Assets/sprites/cardpack04.png';

export const CardData = createContext({});

const CardDataProvider = ({children}) => {
    const [packs, setPacks] = useState([]);
    const [packSelected, setPackSelected] = useState({});

    const setPack = (packId) => {
        const pack = packs.find(pack => pack.id === packId);
        setPackSelected(pack);
    }

    useEffect(() => {
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
            ])

    }, [])

    return (
        <CardData.Provider value = {{setPack, packs, packSelected}}>
            {children}
        </CardData.Provider>
    )
}

export default CardDataProvider;
