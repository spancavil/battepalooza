import React from 'react'
import Modal from '../../../../Global-Components/Modal';
import styles from './styles.module.scss';
import Button from '../../../../Global-Components/Button';

const Complete = ({title, goOpenPack, closeComplete}) => {
    return (
        <div className={styles.parentContainerModal}>
          <Modal title="Complete" handleClose={closeComplete}>
            <h3 className={styles.textDrop}>You have successfully purchased {title}</h3>
            <div className={styles.buttonsContainer}>
                <Button title="Open pack" onClick={goOpenPack} modal = {true} />
            </div>
          </Modal>
        </div>
    )
}

export default Complete