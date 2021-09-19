import React from 'react'
import styles from './style.module.scss';
/**
 * 
 * @param label Label del checkbox 
 * @param width Ancho del div
 * @param onChecked Devuelve el estado del checkbox actualizado
 * @returns 
 */
const Checkbox = ({label, width, onChecked}) => {
    return (
        <div className={styles.container} style={{width: width}}>
            <input type="checkbox" value="Terms of service" onChange = { e => onChecked(e.target.checked)}/>
            <label >{label}</label>
        </div>
    )
}

export default Checkbox
