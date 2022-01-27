import React from 'react';
import Modal from '../../../../Global-Components/Modal';
import styles from './styles.module.scss';
import Button from '../../../../Global-Components/Button';

const ModalUnregister = ({setmodalUnregister, unRegister}) => {
    return (
        <div className={styles.parentContainerModal}>
            <Modal
                title="Confirmation"
                handleClose={() => setmodalUnregister(false)}
            >
                <h3 className={styles.textDrop}>
                    Tron Warrior #1234 has been unregistered for sale in the
                    Marketplace
                </h3>
                <div
                    style={{
                        width: "100%",
                        paddingTop: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingBottom: "25px",
                    }}
                >
                    <Button
                        modal={true}
                        title="CONFIRM"
                        width="176px"
                        onClick={unRegister}
                    />
                </div>
            </Modal>
        </div>
    )
};

export default ModalUnregister;
