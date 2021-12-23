import React, {useEffect} from 'react';
import DialogCross from './Assets/DialogCross';
import {general, cross} from './style.module.scss';

/**
 * Dialog box
 * @param title Title: el titulo del dialog
 * @param children El contenido del dialog
 * @param handleClose La ruta que va al cerrar el dialog
 */

const ModalTable = ({title, children, handleClose}) => {

    //On escape it will close
    useEffect(() => {
      const handleEsc = (event) => {
        if (event.keyCode === 27) {
          handleClose()
        }
      };
  
      window.addEventListener('keydown', handleEsc);
  
      return () => {
        window.removeEventListener('keydown', handleEsc);
      };
    }, [handleClose])

  return (
    <div className={general}>
      <p>{title}</p>
        <DialogCross className={cross} onClick ={handleClose}/>
      {children}
    </div>
  );
};

export default ModalTable;
