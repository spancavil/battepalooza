import React, {useState, useEffect} from 'react';
import styles from './style.module.scss';
import dorso from '../../../../Assets/img/nft-card-back01.png';

/**
 * An animation for card reveal. La imagen del dorso de la card ya está predefinida.
 * @param reveal True or false, si queremos que se revele la card. Default: false
 * @param imgFrente The front image card
 * @function isRevealed la funcion que se ejecuta apenas se revela
 *  
 */

const CardToReveal = ({reveal, imgFrente, isRevealed}) => {

    const [rotate, setRotate] = useState(false)

    const handleRotate = () => {
        if (rotate === false) {
            setRotate(true);
            isRevealed();
        }
    }

    useEffect(() => {
        if (reveal && rotate === false) {
            setRotate(true);
        }
    }, [reveal, rotate, isRevealed])

    return (

        <div className={styles.cardContainer}>
            <div className={ rotate ? styles.div1Rotate : styles.div1 } onClick = {handleRotate}>
                <img src={dorso} alt="cara"></img>
            </div>  
            <div className={ rotate ? styles.div2Rotate : styles.div2 } onClick = {handleRotate}>
                <img src={imgFrente} alt="cruz"></img>
            </div>
        </div>
    )
}

export default CardToReveal
