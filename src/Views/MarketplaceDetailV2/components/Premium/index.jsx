import React from 'react';
import Modal from '../../../../Global-Components/Modal';
import styles from './styles.module.scss';

const PremiumModal = ({ setPremium, premiumBuffs }) => {
    const BP_BASE_URL = process.env.REACT_APP_API_BATTLEPALOOZA
    console.log(premiumBuffs);
    return (
        <Modal title={"Buff information"} handleClose={setPremium}>
            <div className={styles.container}>
                {premiumBuffs.map(premiumBuff => {
                    return(
                        <div className={styles.content}>
                            <img className={styles.imagen} src={BP_BASE_URL + premiumBuff.icon} alt="buff" />
                            <p>{premiumBuff.engName} </p>
                            <p>+{premiumBuff.value}%</p>
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}

export default PremiumModal