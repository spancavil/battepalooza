import React from 'react'
import styles from './style.module.scss';
/**
 *  
 * @param width Ancho del div
 * @param onChecked Devuelve el estado del checkbox actualizado
 * @returns 
 */
const CheckboxLinks = ({width, onChecked}) => {
    return (
        <div className={styles.container} style={{width: width}}>
            <input type="checkbox" value="Terms of service" onChange = { e => onChecked(e.target.checked)}/>
            <label >
            I agree to the 
                <a 
                className = {styles.links}
                rel="noreferrer"
                href="http://battlepalooza.com/terms-of-service"
                target="_blank"
                > Terms of Service</a> and 
                <a 
                className = {styles.links}
                rel="noreferrer"
                href="http://battlepalooza.com/privacy-policy"
                target="_blank"
                > Private Policy</a>
            </label>
        </div>
    )
}

export default CheckboxLinks
