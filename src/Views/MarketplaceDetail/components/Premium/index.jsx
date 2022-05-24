import React from 'react';
import Modal from '../../../../Global-Components/Modal';
import styles from './styles.module.scss';

const PremiumModal = ({ setPremium, premiumBuff }) => {
    const BP_BASE_URL = process.env.REACT_APP_API_BATTLEPALOOZA

    console.log(premiumBuff);
    return (
        <Modal title={"Buff information"} handleClose={setPremium}>
            <div className={styles.content}>
                <img className={styles.imagen} src={BP_BASE_URL + premiumBuff.icon} alt="buff" />
                <p>{premiumBuff.engName} </p>
            </div>
        </Modal>
    )
}

export default PremiumModal