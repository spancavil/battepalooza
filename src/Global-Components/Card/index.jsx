import React from 'react';
import styles from './styles.module.scss';

/**
 * Card de pack
 * @param imgSrc la imagen de la card
 * @param sale true o false, si está en sale o no
 * @param soldOut true o false, si está o no soldout
 * @param text1 el texto de la primera línea
 * @param text2 el texto de la segunda línea
 * @param text3 el texto de la tercera línea 
 * @param handleClick Se ejecuta al hacer click sobre la card
 * @returns 
 */

const Card = ({imgSrc, text1, text2, text3, sale, soldOut, handleClick}) => {

    return(
            <div
            onClick = {handleClick}
            className={ !soldOut ? styles.container : styles.soldOut}>
                <img className={styles.imagenCard} src={imgSrc} alt="card-pack"></img>
                {text1 && <p className={styles.texto} style={{color: "white"}}>{text1}</p>}
                {text2 && <p className={styles.texto} style={{color: "yellow"}}>{text2}</p>}
                {text3 && <p className={styles.texto} style={{color: "white"}}>{text3}</p>}
                {sale && <div className={styles.sale}>Sale</div>}
                {soldOut && <p className={styles.textSoldOut}>SOLD OUT</p>}
            </div>
    )
}

export default Card;