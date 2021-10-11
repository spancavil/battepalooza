import React from 'react';
import Background from '../../Global-Components/Background';
import CardToReveal from './components/CardToReveal';
import styles from './styles.module.scss'

const CardAnimation = () => {
    return (
        <Background>
            <div className = {styles.container}>
                <CardToReveal/>
            </div>
        </Background>
    )
}

export default CardAnimation;
