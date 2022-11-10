import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { ReactComponent as DialogCross } from "../../Assets/svg/Cross.svg";

/**
 * Dialog box
 * @param title Title: el titulo del dialog
 * @param children El contenido del dialog
 * @param handleClose La ruta que va al cerrar el dialog
 */

const ModalV2 = ({ title, children, handleClose }) => {
  //On escape it will close
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        handleClose();
      }
    };

    handleClose && window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [handleClose]);

  return (
    <div className={styles.modal}>
      <header>
        <p>{title}</p>
        {handleClose && <DialogCross onClick={handleClose} />}
      </header>
      {children}
    </div>
  );
};

export default ModalV2;
