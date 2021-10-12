import React, { useState } from 'react';
import Background from '../../Global-Components/Background';
import CardToReveal from './components/CardToReveal';
import styles from './styles.module.scss';
import frente from '../../Assets/img/nft-card-front01.png';
import Button from '../../Global-Components/Button';
import { useMediaQuery } from '../../Hooks/useMediaQuery';
import ScrollBar from '../../Global-Components/ScrollBar';

const CardAnimation = () => {
    const [reveal, setReveal] = useState(false);
    const [scroll, setScroll] = useState ({scrollLeft: '', scrollWidth: ''});
    const queryTablet = useMediaQuery ('(max-width: 766px)');

    const handleReveal = () => {
        setReveal(true);
    }

    const handleScroll = e => {
        setScroll ({
          scrollLeft: e.target.scrollLeft,
          scrollWidth: e.target.scrollWidth - e.target.offsetWidth,
        });
    };
    
    return (
        <Background>
            <div className = {styles.container}>

                <div className = {styles.cardDeck} onScroll={handleScroll}>
                    <CardToReveal
                        imgFrente = {frente}
                        reveal = {reveal}
                    />
                    <CardToReveal
                        imgFrente = {frente}
                        reveal = {reveal}
                    />
                    <CardToReveal
                        imgFrente = {frente}
                        reveal = {reveal}
                    />
                </div>

                {queryTablet &&
                    <ScrollBar
                    width={scroll.scrollWidth}
                    position={scroll.scrollLeft}
                    elements={3}
                />}

                <div className = {styles.buttonContainer}>
                    <Button
                        title = "REVEAL ALL"
                        onClick = {handleReveal}
                    />
                </div>

            </div>
        </Background>
    )
}

export default CardAnimation;
