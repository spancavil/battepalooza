import React, {useState} from 'react';
import styles from './style.module.scss';
import frente from '../../../../Assets/img/nft-card-front01.png';
import dorso from '../../../../Assets/img/nft-card-back01.png';

const CardToReveal = () => {

    const [rotate, setRotate] = useState(false)

    const handleRotate = () => {
        rotate === false && setRotate(true);
    }

    return (

        <div className={styles.cardContainer}>
            <div className={ rotate ? styles.div1Rotate : styles.div1 } onClick = {handleRotate}>
                <img src={dorso} alt="cara"></img>
            </div>  
            <div className={ rotate ? styles.div2Rotate : styles.div2 } onClick = {handleRotate}>
                <img src={frente} alt="cruz"></img>
            </div>
        </div>
    )
}

export default CardToReveal
