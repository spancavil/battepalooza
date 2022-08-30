import React, { useState } from "react";
import Background from "../../Global-Components/Background";
import CardToReveal from "./components/CardToReveal";
import styles from "./styles.module.scss";
import Button from "../../Global-Components/Button";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import ScrollBar from "../../Global-Components/ScrollBar";
import { useHistory } from "react-router";

/* NO SE ESTA USANDO ESTE COMPONENTE, E IBA EN LA RUTA /card-animation */
const CardAnimation = ({ nfts }) => {
    const [reveal, setReveal] = useState(false);
    const [scroll, setScroll] = useState({ scrollLeft: "", scrollWidth: "" });
    const [countReveal, setCountReveal] = useState(0);
    const queryTablet = useMediaQuery("(max-width: 766px)");
    const history = useHistory();

    const handleReveal = () => {
        setReveal(true);
    };

    const childReveal = () => {
        setCountReveal(countReveal + 1);
    };

    const handleScroll = (e) => {
        setScroll({
            scrollLeft: e.target.scrollLeft,
            scrollWidth: e.target.scrollWidth - e.target.offsetWidth,
        });
    };

    const goCollection = () => {
        history.push("/collection");
    };

    console.log(nfts);

    return (
        <Background>
            <div className={styles.container}>
                <div className={styles.cardDeck} onScroll={handleScroll}>
                    {nfts.map((nft) => {
                        console.log(nft);
                        return (
                            <CardToReveal
                                key={nft.uuid}
                                nft = {nft}
                                reveal={reveal}
                                isRevealed={childReveal}
                            />
                        );
                    })}
                </div>

                {queryTablet && (
                    <ScrollBar
                        width={scroll.scrollWidth}
                        position={scroll.scrollLeft}
                        elements={3}
                    />
                )}

                <div className={styles.buttonContainer}>
                    {/* Hardcode 3, en realidad es la cantidad de cards dentro del pack */}
                    {!(reveal || countReveal === nfts?.length) ? (
                        <Button title="REVEAL ALL" onClick={handleReveal} />
                    ) : (
                        <Button title="COLLECTION" onClick={goCollection} />
                    )}
                </div>
            </div>
        </Background>
    );
};

export default CardAnimation;
