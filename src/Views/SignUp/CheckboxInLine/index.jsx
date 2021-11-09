import React from 'react';
import styles from './styles.module.scss';

const CheckboxInLine = ({title, check, checked}) => {
    return (
        <div className={styles.container}>
            <div className={styles.question} style = {{opacity: checked ? 0.5: 1}}>
                <h2 className={styles.text}>{title}</h2>
            </div>
            <div className={styles.checkBoxes}>
                <div className={styles.inLine}>
                    <h2
                    style = {{opacity: checked ? 0.6: 1}}
                    className={styles.text}>
                    Yes
                    </h2>
                    <input
                    onChange = {()=> check("yes")} 
                    className = {styles.check}
                    disabled = {checked}
                    type="checkbox"/>
                </div>
                <div className={styles.inLine}>
                    <h2
                    style = {{opacity: checked ? 0.5: 1}}
                    className={styles.text}>
                    No
                    </h2>
                    <input 
                    onChange = {()=> check("no")} 
                    className = {styles.check}
                    disabled = {checked}
                    type="checkbox"/>
                </div>
            </div>
        </div>
    )
}

export default CheckboxInLine
