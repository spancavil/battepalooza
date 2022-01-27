import React from 'react';
import Modal from '../../../../Global-Components/Modal';
import Input from '../../../../Global-Components/Input';
import Button from '../../../../Global-Components/Button';
import styles from './styles.module.scss';

const ModalRegister1 = ({setmodalRegister1, handleInputChange, Register, inputPrice}) => {
    return (
        <div className={styles.parentContainerModal}>
            <Modal
                title="Register to Marketplace"
                handleClose={() => setmodalRegister1(false)}
            >
                <div className={styles.modalContent}>
                    <p className={styles.subtitle}>
                        All registered NFT will appear at the Marketplace
                    </p>
                    <p className={styles.content}>Tron Warrior #1234</p>
                    <div className={styles.inputContainer}>
                        <Input
                            label="Input price"
                            handleChange={(precio) => handleInputChange(precio)}
                            widthContainer={"90%"}
                            width={"100%"}
                        />
                        <p>NCoin</p>
                    </div>
                    <p className={styles.fee}>Fee (5%)</p>
                    <p className={styles.ncoin}>
                        {inputPrice > 0 ? (inputPrice * 0.05).toFixed(0) : 0}{" "}
                        NCoin
                    </p>
                    <hr />
                    <p className={styles.afterFee}>
                        {inputPrice > 0
                            ? (inputPrice - inputPrice * 0.05).toFixed(0)
                            : 0}{" "}
                        NCoin (Amount received after fee)
                    </p>
                </div>
                <div>
                    <Button
                        title="REGISTER"
                        width="176px"
                        onClick={Register}
                        modal={true}
                    />
                </div>
            </Modal>
        </div>
    )
};

export default ModalRegister1;
