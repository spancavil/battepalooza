import LeftP2e from "../../../../Assets/img/Sprite_Icon_Premium_05.png";

import styles from "./styles.module.scss";

const Description = ({ chosenNft, register, unRegister, buyNft }) => {
  return (
    <div className={styles.description}>
      <h3>Description</h3>
      <span className={styles.soldBy}>
        Sold by <b>Username01</b>
      </span>
      <p className={styles.serial}>Serial: XXXXXXXXXXX</p>
      <span className={styles.descriptionText}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it.
      </span>
      <h4>P2E Info</h4>
      <h5>Left times to P2E</h5>
      <div className={styles.p2eLeft}>
        <img src={LeftP2e} alt="Left p2e" />
        <p>27 Left</p>
      </div>
    </div>
  );
};

export default Description;
