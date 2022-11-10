import Button from "../../../../Global-Components/Button";
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
          <Button title="Collection" onClick={goCollection} modal={true} />
          <Button title="Marketplace" onClick={goMarketPlace} modal={true} />
        </div>
      </ModalV2>
    </div>
  );
};

export default Complete;
