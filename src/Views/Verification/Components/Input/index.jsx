import React from 'react';
import styles from './style.module.scss';

/**
 * Input para los dialogs
 * @param label Titulo del input
 * @param subtitle Texto debajo del input (de corresponder)
 * @param width Ancho del input
 * @param type Tipo de input (number, email, etc)
 * @param handleChange Función que devuelve el valor del input
 */

const Input = ({label, subtitle, width, type, handleChange, value, autofocus}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={label}>{label}</label>
      <input
        required
        autoComplete="off"
        type={type}
        id={label}
        name={label}
        style={{width: width}}
        value={value}
        onChange={e => handleChange (e.target.value)}
        autoFocus
      />
      {subtitle && <span>{subtitle}</span>}
    </div>
  );
};

export default Input;
