import React from 'react';
import styles from './style.module.scss';

/**
 * El Button recibe 2 props
 * un Title (que es el contenido del boton) 
 * y un evento onClick (accion a realizar cuando se hace click)
 */

const Button = ({title, onClick}) => {
  return (
    <button
      className={styles.botonGenerico}
      onClick={onClick ? () => onClick () : null}
    >
      {title}
    </button>
  );
};

export default Button;
