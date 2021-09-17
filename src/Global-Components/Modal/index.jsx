import React from 'react'
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
            <DialogCross className={cross}/>
            {children}
        </div>
    )
}

export default Modal
