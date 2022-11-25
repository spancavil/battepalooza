import Input from "../../../../Global-Components/Input";
import styles from "./styles.module.scss";
import ModalV2 from "../../../../Global-Components/ModalV2";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";

const ModalRegister1 = ({
  setmodalRegister1,
  handleInputChange,
  Register,
  inputPrice,
  minimunPrice,
  fee,
}) => {
  return (
    <div className={styles.parentContainerModal}>
      <ModalV2
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
          <div className={styles.feeAndMinimal}>
            <p className={styles.fee}>
              Minimal price: {minimunPrice + 1} NCoin
            </p>
            <p className={styles.fee}>Fee: {fee}%</p>
          </div>
          <hr />
          <p className={styles.afterFee}>
            {inputPrice > 0 ? Math.round(Number(inputPrice) - ((Number(inputPrice) / 100) * fee)) : 0}{" "}
            NCoin (Amount expected to receive)
          </p>
        </div>

        <ButtonRounded
          title="REGISTER"
          width="176px"
          onClick={Register}
          modal={true}
        />
      </ModalV2>
    </div>
  );
};

export default ModalRegister1;
