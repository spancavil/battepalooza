import React from "react";
import styles from "./style.module.scss";

/**
 * Input para los dialogs
 * @param label Titulo del input
 * @param subtitle Texto debajo del input (de corresponder)
 * @param width Ancho del input
 * @param type Tipo de input (number, email, etc)
 * @param handleChange Función que devuelve el valor del input
 */

const Input = ({
    inputType = "blue",
    label,
    subtitle,
    width,
    widthContainer,
    type,
    handleChange,
    autofocus,
    autoComplete = "off",
    errorMessage,
}) => {
    return (
        <div
            className={
                inputType === "blue"
                    ? styles.inputContainer
                    : styles.inputContainerWhite
            }
            style={{ width: widthContainer ? widthContainer : null }}
        >
            <label htmlFor={label}>{label}</label>
            <input
                required
                autoComplete={autoComplete}
                type={type}
                id={label}
                name={label}
                style={{ width: width }}
                onChange={(e) => handleChange(e.target.value)}
                autoFocus={autofocus}
            />
            {subtitle && <span>{subtitle}</span>}
            {errorMessage && <span className={styles.errorTitle}>{errorMessage}</span>}
        </div>
    );
};

export default Input;
