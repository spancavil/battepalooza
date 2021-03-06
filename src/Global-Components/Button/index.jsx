import React from 'react';
import styles from './style.module.scss';

/**
 * El Button recibe 2 props
 * un Title (que es el contenido del boton) 
 * y un evento onClick (accion a realizar cuando se hace click)
 */

const Button = ({title, onClick, width, style, main = false, modal = false}) => {
  return (
    <button

      style={{width: `${width}`, ...style}}
      className={main ? styles.botonGenericoMainPage : modal ? styles.botonGenericoModal : styles.botonGenerico}
      onClick={onClick ? (e) => onClick (e) : null}
    >
      {title}
    </button>
  );
};

export default Button;
