import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import ModalV2 from "../../../../Global-Components/ModalV2";

import styles from "./styles.module.scss";

const ModalBurnNft = ({ closeModal, confirmBurn }) => {
  return (
    <div className={styles.parentContainerModal}>
      <ModalV2 title="Burn Nft" handleClose={() => closeModal(false)}>
        <h3 className={styles.textDrop}>Are you sure to burn this nft?</h3>
        <div className={styles.buttonsContainer}>
          <ButtonRounded title="CONFIRM" onClick={() => confirmBurn()} />
          <ButtonRounded title="CANCEL" onClick={() => closeModal(false)} />
        </div>
      </ModalV2>
    </div>
  );
};

export default ModalBurnNft;
