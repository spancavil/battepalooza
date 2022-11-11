import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import ModalV2 from "../../../../Global-Components/ModalV2";

import styles from "./styles.module.scss";

const ModalUnregister = ({ setmodalUnregister, confirmUnregister, name }) => {
  return (
    <div className={styles.parentContainerModal}>
      <ModalV2
        title="Confirmation"
        handleClose={() => setmodalUnregister(false)}
      >
        <h3 className={styles.textDrop}>
          Will you unregister {name} from the marketplace?
        </h3>
        <div className={styles.buttonsContainer}>
          <ButtonRounded title="CONFIRM" onClick={confirmUnregister} />
          <ButtonRounded
            title="CANCEL"
            onClick={() => setmodalUnregister(false)}
          />
        </div>
      </ModalV2>
    </div>
  );
};

export default ModalUnregister;
