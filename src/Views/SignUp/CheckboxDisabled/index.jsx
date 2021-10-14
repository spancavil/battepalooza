import React from 'react'
import styles from './style.module.scss';
/**
 * 
 * @param label Label del checkbox 
 * @param width Ancho del div
 * @param onChecked Devuelve el estado del checkbox actualizado
 * @param checked En caso de estar checked, se deshabilita el input
 * @returns 
 */
const CheckboxDisabled = ({label, width, onChecked, checked}) => {
    return (
        <div className={styles.container} style={{width: width}}>
            <input 
            type="checkbox"
            value="Terms of service"
            onChange = { e => onChecked(e.target.checked)}
            disabled = {checked ? true : false}
            />
            <label >{label}</label>
        </div>
    )
}

export default CheckboxDisabled;
