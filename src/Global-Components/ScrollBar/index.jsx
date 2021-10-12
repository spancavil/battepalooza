import React from 'react';
import styles from './styles.module.scss';

/**
 * Una scrollbar segmentada
 * @param width El ancho total del scrollbar
 * @param position La posición actual del scrollbar
 * @param elements La cantidad de elementos de la scrollbar 
 */

const ScrollBar = ({ width, position, elements }) => {

    
    const breakLength = width / elements;
    const breaks = []
    
    //Generamos los distintos breakpoints
    breaks.push(0);
    for (let i = 0; i < width; i++) {
        (i > 0) && breaks.push(i);
        i += breakLength;
    }
    breaks.push(width);

    //Generamos un array auxiliar con la cantidad de elementos pasados por props
    const arrayCuadraditos = new Array(elements);
    for (let i = 0; i < arrayCuadraditos.length; i++) {
        let active = position >= breaks[i] && position <= breaks[i + 1];
        arrayCuadraditos[i] = {
            index: i + 1,
            active
        };
    }

    return (
        <div className={styles.containerScrollbar}>
            {arrayCuadraditos.map(cuadradito => {
                return <div
                    className={cuadradito.active ? styles.cuadraditoActive: styles.cuadradito}
                    key={cuadradito.index}>
                </div>
            })}
        </div>
    )
}

export default ScrollBar;
