import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import ModalV2 from "../../../../Global-Components/ModalV2";

import styles from "./styles.module.scss";

const Complete = ({ title, goMarketPlace, goCollection }) => {
  return (
    <div className={styles.parentContainerModal}>
      <ModalV2 title="Complete" handleClose={goMarketPlace}>
        <h3 className={styles.textDrop}>
          You have successfully purchased {title}
        </h3>
        <div className={styles.buttonsContainer}>
          <ButtonRounded title="Collection" onClick={goCollection} />
          <ButtonRounded title="Marketplace" onClick={goMarketPlace} />
        </div>
      </ModalV2>
    </div>
  );
};

export default Complete;
