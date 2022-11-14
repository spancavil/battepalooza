import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import dorso from "../../../../Assets/img/nft-card-back01.png";
import NftCard from "../../../../Global-Components/NftCard";
import Tooltip from "../../../Tooltip";

const CardToReveal = ({ revealAll, nft, isRevealed, isRotated = false, nftIndex, carouselIndex, nftLengthList, setEnded}) => {

    const [rotate, setRotate] = useState(isRotated);
    const [tooltTipVisibility, setTooltipVisibility] = useState(false)
    const [buffs, setBuffs] = useState([])

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
        <div 
            className={nftIndex === carouselIndex ? styles.cardContainerActive : styles.cardContainer}
        >
            <div
                className={rotate ? styles.div1Rotate : styles.div1}
                onClick={handleRotate}
            >
                <img src={dorso} alt="cara"></img>
            </div>
            {/* <div className={ rotate ? styles.div2Rotate : styles.div2 } onClick = {handleRotate}>
                <img src={nft.thumbnailUrl} alt="cruz"></img>
            </div> */}

            <div className = {rotate ? styles.div2Rotate : styles.div2}>
                <NftCard 
                    nft={nft} 
                    onClick={()=> {}}
                    additionalStyles = {{textAlign: 'left'}}
                    hoverOnBuff = {handleBuffVisibility}
                />
                {tooltTipVisibility ? 
                    <Tooltip
                        buffsInPack={buffs}
                        hoverOnBuff = {handleBuffVisibility}
                    />
                    : null
                }
                {/* <div
                    key={nft.uuid}
                    className={
                        nft.rarity === "COMMON"
                            ? styles.borderCommon
                            : nft.rarity === "RARE"
                            ? styles.borderRare
                            : nft.rarity === "EPIC"
                            ? styles.borderEpic
                            : styles.borderLegendary
                    }
                >
                    <div className={styles.cardNft}>
                        El source luego cambiara en base al asset
                        <img
                            className={styles.imgNft}
                            src={nft.thumbnailUrl}
                            alt="nft-thumb"
                        />
                        <div className={styles.texts}>
                            <p className={styles.itemName}>{nft.itemName}</p>
                            <p>{nft.repName}</p>
                            <p className={styles.text2}>{nft.rarity}</p>
                            <p>#{nft.itemId}</p>
                             <p>
                        gNCoin Battle Count: {nft.playCount}/{nft.maxPlayCount}
                    </p> 
                            {/* {nft.salesState === 1 && (
                        <p className={styles.price}>{nft.price} NCoin</p>
                    )}
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default CardToReveal;
