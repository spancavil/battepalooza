import React, { useState } from "react";
import CardToReveal from "./components/CardToReveal";
import styles from "./styles.module.scss";
import Button from "../../Global-Components/Button";
import { useHistory } from "react-router-dom";

/* NO SE ESTA USANDO ESTE COMPONENTE, E IBA EN LA RUTA /card-animation */
const CardAnimationPack = ({ nfts }) => {
    const [reveal, setReveal] = useState(false);
    const [countReveal, setCountReveal] = useState(0);
    const history = useHistory();

    const handleReveal = () => {
        setReveal(true);
    };

    const childReveal = () => {
        setCountReveal(countReveal + 1);
    };

    const goCollection = () => {
        history.push("/collection");
    };


    return (
        <>
            {/* <div className={styles.cardDeck}> */}
                {nfts.map((nft) => {
                    return (
                        <CardToReveal
                            key={nft.uuid}
                            nft = {nft}
                            reveal={reveal}
                            isRevealed={childReveal}
                        />
                    );
                })}
                {/* <div className={styles.buttonContainer}>
                   Hardcode 3, en realidad es la cantidad de cards dentro del pack 
                    {!(reveal || countReveal === nfts?.length) ? (
                        <Button title="REVEAL ALL" onClick={handleReveal} />
                    ) : (
                        <Button title="COLLECTION" onClick={goCollection} />
                    )}
                </div> */}
            {/* </div> */}

            {/* {queryTablet && (
                <ScrollBar
                    width={scroll.scrollWidth}
                    position={scroll.scrollLeft}
                    elements={3}
                />
            )} */}
        </>
    );
};

export default CardAnimationPack;
