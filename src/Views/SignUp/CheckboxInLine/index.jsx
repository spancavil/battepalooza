import React from 'react';
import styles from './styles.module.scss';
import { useState } from 'react';

const CheckboxInLine = ({title, check, deshabilitado}) => {
    const [option, setOption] = useState("");

    const setCheck = (opcion) => {
        setOption(opcion)
        check(opcion)
    }

    return (
        <div className={styles.container}>
            <div className={styles.question} style = {{opacity: deshabilitado ? 0.5: 1}}>
                <h2 className={styles.text}>{title}</h2>
            </div>
            <div className={styles.checkBoxes}>
                <div className={styles.inLine}>
                    <h2
                    style = {{opacity: deshabilitado ? 0.6: 1}}
                    className={styles.text}>
                    Yes
                    </h2>
                    <input
                    onChange = {()=> setCheck("Yes") } 
                    className = {styles.check}
                    disabled = {deshabilitado}
                    checked = {option === "Yes" ? true : false}
                    type="checkbox"/>
                </div>
                <div className={styles.inLine}>
                    <h2
                    style = {{opacity: deshabilitado ? 0.5: 1}}
                    className={styles.text}>
                    No
                    </h2>
                    <input 
                    onChange = {()=> setCheck("No") } 
                    className = {styles.check}
                    disabled = {deshabilitado}
                    checked = {option === "No" ? true : false}
                    type="checkbox"/>
                </div>
            </div>
        </div>
    )
}

export default CheckboxInLine
