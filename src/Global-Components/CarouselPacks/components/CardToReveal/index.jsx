import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import dorso from "../../../../Assets/img/nft-card-back01.png";
import NftCard from "../../../../Global-Components/NftCard";

const CardToReveal = ({ reveal, nft, isRevealed, setCanMove, isRotated = false, nftIndex, nftLengthList, setEnded}) => {

    const [rotate, setRotate] = useState(isRotated);

    const handleRotate = () => {
        if (rotate === false) {
            setRotate(true);
            isRevealed();
            setCanMove(true)
            if (nftIndex + 1 === nftLengthList) setEnded (true)
        }
    };

    useEffect(() => {
        if (reveal && rotate === false) {
            setRotate(true);
        }
    }, [reveal, rotate, isRevealed]);

    return (
        <div className={styles.cardContainer}>
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
                <NftCard nft={nft} onClick={()=> {}}/>
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
