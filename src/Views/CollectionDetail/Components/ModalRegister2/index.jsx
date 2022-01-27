import React from 'react';
import Modal from '../../../../Global-Components/Modal';
import Button from '../../../../Global-Components/Button';
import styles from './styles.module.scss';

const ModalRegister2 = ({setmodalRegister2, handleMarket}) => {
  return (
    <div className={styles.parentContainerModal}>
    <Modal
      title="Confirmation"
      handleClose={() => setmodalRegister2(false)}
    >
      <h3 className={styles.textDrop}>
        The NFT has been registered <br />
        for sale in the Marketplace
      </h3>
      <div
        style={{ paddingBottom: "25px" }}
        className={styles.buttonsContainer}
      >
        <Button
          modal={true}
          title="MARKETPLACE"
          width="198px"
          onClick={handleMarket}
        />
        <Button
          modal={true}
          title="CONFIRM"
          width="198px"
          onClick={() => setmodalRegister2(false)}
        />
      </div>
    </Modal>
  </div>
  );
};

export default ModalRegister2;
