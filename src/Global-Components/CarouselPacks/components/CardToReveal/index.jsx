import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import dorso from "../../../../Assets/img/nft-card-back01.png";
import NftCard from "../../../../Global-Components/NftCard";
import Tooltip from "../../../Tooltip";
import TapRevealIcon from "../../../../Assets/svg/TapReveal";
import { useMediaQuery } from "../../../../Hooks/useMediaQuery";

const CardToReveal = ({ 
    revealAll, 
    nft, 
    isRevealed, 
    isRotated = false, 
    nftIndex, 
    carouselIndex, 
    nftLengthList,
    ended, 
    setEnded,
}) => {

    const [rotate, setRotate] = useState(isRotated);
    const [tooltTipVisibility, setTooltipVisibility] = useState(false)
    const [buffs, setBuffs] = useState([])

    const tablet = useMediaQuery('(max-width: 767px)')

    const handleRotate = () => {
        if (rotate === false && (nftIndex === carouselIndex)) {
            setRotate(true);
            isRevealed();
            if (nftIndex + 1 === nftLengthList) setEnded (true)
        }
    };

    useEffect(() => {
        if (revealAll && rotate === false) {
            setRotate(true);
        }
    }, [revealAll, rotate, isRevealed]);

    const handleBuffVisibility = (buffs) => {
        if (buffs) {
            setBuffs(buffs)
            setTooltipVisibility (true)
        }
        else {
            setTooltipVisibility (false);
        }
    }

    return (
        <>
            <div className={
                (nftIndex === carouselIndex) && !ended && !rotate
                ? styles.revealContainer
                : styles.revealContainerHidden
            }>
                    <p className={styles.revealText}>{tablet ? "Tap" : "Click"} to reveal</p>
                    <TapRevealIcon className={styles.icon}/>
            </div>
            <div 
                className={nftIndex === carouselIndex 
                    ? (rotate
                    ? styles.cardContainerActive 
                    : styles.cardContainerActiveNotRotated)
                    : styles.cardContainer}
            >
                <div
                    className={rotate ? styles.div1Rotate : styles.div1}
                    onClick={handleRotate}
                >
                    <img src={dorso} alt="cara"></img>
                </div>

                <div className = {rotate ? styles.div2Rotate : styles.div2}>
                    <NftCard 
                        nft={nft} 
                        onClick={()=> {}}
                        additionalStyles = {{
                            textAlign: 'left',
                            height: 338
                        }}
                        hoverOnBuff = {handleBuffVisibility}
                    />
                    {tooltTipVisibility ? 
                        <Tooltip
                            buffsInPack={buffs}
                            hoverOnBuff = {handleBuffVisibility}
                        />
                        : null
                    }
                </div>
            </div>
        </>
    );
};

export default CardToReveal;
