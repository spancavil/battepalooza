import React from 'react';
import {general} from './style.module.scss';

/**
 * Dialog box
 * @param title Title: el titulo del dialog
 * @param children El contenido del dialog
 * @param handleClose La ruta que va al cerrar el dialog
 */

const ModalII = ({title, children, handleClose}) => {
  return (
    <div className={general}>
      <p className={title}>{title}</p>
        {/* <DialogCross className={cross} onClick ={handleClose}/> */}
      {children}
    </div>
  );
};

export default ModalII;
