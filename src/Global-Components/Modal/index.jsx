import React from 'react';
import {Link} from 'react-router-dom';
import DialogCross from './Assets/DialogCross';
import {general, cross} from './style.module.scss';

/**
 * Dialog box
 * @param title Title: el titulo del dialog
 * @param children El contenido del dialog
 *
 */

const Modal = ({title, children}) => {
  return (
    <div className={general}>
      <p className={title}>{title}</p>
      <Link to="/">
        <DialogCross className={cross} />
      </Link>
      {children}
    </div>
  );
};

export default Modal;
