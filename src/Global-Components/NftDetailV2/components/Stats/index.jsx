import styles from "./styles.module.scss";

import HP from "../../../../Assets/img/Sprite_Icon_Stat_01.png";
import ENERGY from "../../../../Assets/img/Sprite_Icon_Stat_02.png";
import SPEED from "../../../../Assets/img/Sprite_Icon_Stat_04.png";

const Stats = ({ chosenNft }) => {
  const isWeapon = chosenNft?.type === 2;

  return (
    <div className={styles.stats}>
      <h4 className={styles.title}>Stats</h4>
      <div className={styles.items}>
        <div className={styles.itemStatContainer}>
          <p className={styles.itemStatTitle}>
            {isWeapon ? "DAMAGE" : "HEALTH"}
          </p>
          <div className={styles.itemStatInfo}>
            <img className={styles.icon} src={HP} alt="HP icon" />
            <span>
              {isWeapon ? chosenNft.stat?.damage : chosenNft.stat?.maxHealth}
            </span>
          </div>
        </div>
        <div className={styles.itemStatContainer}>
          <p className={styles.itemStatTitle}>
            {isWeapon ? "CONSUME ENERGY" : "ENERGY"}
          </p>
          <div className={styles.itemStatInfo}>
            <img className={styles.icon} src={ENERGY} alt="Energy icon" />
            <span>
              {isWeapon
                ? `${chosenNft.stat?.consumeEnergy}/${chosenNft.stat?.maxEnergy}`
                : chosenNft.stat?.energyRecovery}
            </span>
          </div>
        </div>
        <div className={styles.itemStatContainer}>
          <p className={styles.itemStatTitle}>
            {isWeapon ? "COOLTIME" : "SPEED"}
          </p>
          <div className={styles.itemStatInfo}>
            <img className={styles.icon} src={SPEED} alt="Speed icon" />
            <span>
              {isWeapon ? chosenNft.stat?.coolTime : chosenNft.stat?.moveSpeed}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
