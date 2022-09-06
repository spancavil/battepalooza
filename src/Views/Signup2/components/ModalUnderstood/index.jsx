import React from 'react';
import {general} from './style.module.scss';

/**
 * Dialog box
 * @param title Title: el titulo del dialog
 * @param children El contenido del dialog
 * @param handleClose La ruta que va al cerrar el dialog
 */

const ModalUnderstood = ({title, children, style}) => {
  return (
    <div style={style} className={general}>
      <p>{title}</p>
      {children}
    </div>
  );
};

export default ModalUnderstood;
