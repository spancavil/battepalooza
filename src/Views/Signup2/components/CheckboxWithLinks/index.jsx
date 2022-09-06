import React from 'react'
import { useHistory } from 'react-router';
import styles from './style.module.scss';
/**
 *  
 * @param width Ancho del div
 * @param onChecked Devuelve el estado del checkbox actualizado
 * @returns 
 */
const CheckboxLinks = ({width, onChecked}) => {

    const history = useHistory()

    return (
        <div className={styles.container} style={{width: width}}>
            <input className={styles.checkboxLinks} type="checkbox" value="Terms of service" onChange = { e => onChecked(e.target.checked)}/>
            <label >
            I agree to the 
                <span 
                className = {styles.links}
                onClick={()=>history.push('/terms-of-service')}
                > Terms of Service</span> and  
                <span 
                className = {styles.links}
                onClick={()=>history.push('/privacy-policy')}
                > Privacy Policy</span>
            </label>
        </div>
    )
}

export default CheckboxLinks
