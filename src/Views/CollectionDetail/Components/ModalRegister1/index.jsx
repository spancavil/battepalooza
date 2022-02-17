import React from "react";
import Modal from "../../../../Global-Components/Modal";
import Input from "../../../../Global-Components/Input";
import Button from "../../../../Global-Components/Button";
import styles from "./styles.module.scss";

const ModalRegister1 = ({
  setmodalRegister1,
  handleInputChange,
  Register,
  inputPrice,
  handleExpiryChange,
}) => {
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
          <div className={styles.inputContainerPrice}>
            <Input
              label="Input price"
              handleChange={(precio) => handleInputChange(precio)}
              width={"100%"}
            />
            <p>NCoin</p>
          </div>
          <p className={styles.fee}>Fee (0%)</p>
          <hr />
          <p className={styles.afterFee}>
            {inputPrice > 0 ? inputPrice : 0} NCoin (Amount expected to receive)
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
  );
};

export default ModalRegister1;
