import styles from "./styles.module.scss";
import StatusBar from "../../../../../../Global-Components/StatusBar";

import HP from "../../../../../../Assets/img/Sprite_Icon_Stat_01.png";
import ENERGY from "../../../../../../Assets/img/Sprite_Icon_Stat_02.png";
import SPEED from "../../../../../../Assets/img/Sprite_Icon_Stat_04.png";
import { NftData } from "../../../../../../Context/NftProvider";
import { useContext } from "react";

const Stats = ({ chosenNft }) => {
  const { characterMaxStats } = useContext(NftData);

  return (
    <div className={styles.stats}>
      <h4 className={styles.title}>Stats</h4>
      <div className={styles.items}>
        <div className={styles.itemStatContainer}>
          <img className={styles.icon} src={HP} alt="HP icon" />
          <div className={styles.itemStatInfo}>
            <p className={styles.itemStatTitle}>HP</p>

            <StatusBar
              color={"red"}
              value={chosenNft.stat?.maxHealth}
              maxValue={characterMaxStats.maxHealth}
            />
          </div>
        </div>
        <div className={styles.itemStatContainer}>
          <img className={styles.icon} src={ENERGY} alt="Energy icon" />
          <div className={styles.itemStatInfo}>
            <p className={styles.itemStatTitle}>Energy</p>
            <StatusBar
              color={"green"}
              value={chosenNft.stat?.energyRecovery}
              maxValue={characterMaxStats.maxEnergyRecovery}
            />
          </div>
        </div>
        <div className={styles.itemStatContainer}>
          <img className={styles.icon} src={SPEED} alt="Speed icon" />
          <div className={styles.itemStatInfo}>
            <p className={styles.itemStatTitle}>Speed</p>
            <StatusBar
              color={"yellow"}
              value={chosenNft.stat?.moveSpeed}
              maxValue={characterMaxStats.maxMoveSpeed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
