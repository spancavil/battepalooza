import styles from "./styles.module.scss";

import HP from "../../../../Assets/img/Sprite_Icon_Stat_01.png";
import ENERGY from "../../../../Assets/img/Sprite_Icon_Stat_02.png";
import SPEED from "../../../../Assets/img/Sprite_Icon_Stat_04.png";

const Stats = ({ chosenNft }) => {
  return (
    <div className={styles.stats}>
      <h4 className={styles.title}>Stats</h4>
      <div className={styles.items}>
        <div className={styles.itemStatContainer}>
          <p className={styles.itemStatTitle}>HEALTH</p>
          <div className={styles.itemStatInfo}>
            <img className={styles.icon} src={HP} alt="HP icon" />
            <span>{chosenNft.stat?.maxHealth}</span>
          </div>
        </div>
        <div className={styles.itemStatContainer}>
          <p className={styles.itemStatTitle}>ENERGY</p>
          <div className={styles.itemStatInfo}>
            <img className={styles.icon} src={ENERGY} alt="Energy icon" />
            <span>{chosenNft.stat?.energyRecovery}</span>
          </div>
        </div>
        <div className={styles.itemStatContainer}>
          <p className={styles.itemStatTitle}>SPEED</p>
          <div className={styles.itemStatInfo}>
            <img className={styles.icon} src={SPEED} alt="Speed icon" />
            <span>{chosenNft.stat?.moveSpeed}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
