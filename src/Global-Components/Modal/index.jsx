import React from 'react';
import DialogCross from './Assets/DialogCross';
import {general, cross} from './style.module.scss';

/**
 * Dialog box
 * @param title Title: el titulo del dialog
 * @param children El contenido del dialog
 * @param handleClose La ruta que va al cerrar el dialog
 */

const Modal = ({title, children, handleClose}) => {
  return (
    <div className={general}>
      <p>{title}</p>
        <DialogCross className={cross} onClick ={handleClose}/>
      {children}
    </div>
  );
};

export default Modal;
