import ModalV2 from "../../../../Global-Components/ModalV2";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";

import styles from "./styles.module.scss";

const Complete = ({ title, goOpenPack, closeComplete }) => {
  return (
    <div className={styles.parentContainerModal}>
      <ModalV2 title="" handleClose={closeComplete}>
        <h3 className={styles.textDrop}>
          Complete! You have successfully purchased Test Pack {title}
        </h3>
        <ButtonRounded title="OPEN PACK" onClick={goOpenPack} />
      </ModalV2>
    </div>
  );
};

export default Complete;
