import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import dorso from "../../../../Assets/img/nft-card-back01.png";
import NftCard from "../../../../Global-Components/NftCard";

/**
 * An animation for card reveal. La imagen del dorso de la card ya está predefinida.
 * @param reveal True or false, si queremos que se revele la card. Default: false
 * @param imgFrente The front image card
 * @function isRevealed la funcion que se ejecuta apenas se revela
 *
 */

const CardToReveal = ({ reveal, nft, isRevealed }) => {

    const [rotate, setRotate] = useState(false);

    console.log(nft);

    const handleRotate = () => {
        if (rotate === false) {
            setRotate(true);
            isRevealed();
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
