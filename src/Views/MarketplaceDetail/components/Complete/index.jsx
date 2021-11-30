import React from 'react'
import Modal from '../../../../Global-Components/Modal';
import styles from './styles.module.scss';
import Button from '../../../../Global-Components/Button';

const Complete = ({title, goMarketPlace, goCollection}) => {
    return (
        <div className={styles.parentContainerModal}>
          <Modal title="Complete" handleClose={goMarketPlace}>
            <h3 className={styles.textDrop}>You have successfully buyed {title}</h3>
            <div className={styles.buttonsContainer}>
                <Button title="Collection" onClick={goCollection} />
                <Button title="Marketplace" onClick={goMarketPlace} />
            </div>
          </Modal>
        </div>
    )
}

export default Complete