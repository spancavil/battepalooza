import styles from "./styles.module.scss";

import HP from "../../../../Assets/img/Sprite_Icon_Stat_01.png";
import ENERGY from "../../../../Assets/img/Sprite_Icon_Stat_02.png";
import SPEED from "../../../../Assets/img/Sprite_Icon_Stat_04.png";
import COOLTIME from "../../../../Assets/img/cooltime.png";
import DAMAGE from "../../../../Assets/img/damage.png";
import ENERGY2 from "../../../../Assets/img/energy.png";

const Stats = ({ chosenNft }) => {
  const nftType = chosenNft?.type === 2 ? "weapon" : "character";

  const data = {
    weapon: {
      icons: [DAMAGE, ENERGY2, COOLTIME],
      titles: ["DAMAGE", "CONSUME ENERGY", "COOLTIME"],
      stats: [
        chosenNft.stat?.damage,
        `${chosenNft.stat?.consumeEnergy}/${chosenNft.stat?.maxEnergy}`,
        chosenNft.stat?.coolTime,
      ],
    },
    character: {
      icons: [HP, ENERGY, SPEED],
      titles: ["HEALTH", "ENERGY", "SPEED"],
      stats: [
        chosenNft.stat?.maxHealth,
        chosenNft.stat?.energyRecovery,
        chosenNft.stat?.moveSpeed,
      ],
    },
  };

  return (
    <div className={styles.stats}>
      <h4 className={styles.title}>Stats</h4>
      <div className={styles.items}>
        <div className={styles.itemStatContainer}>
          <p className={styles.itemStatTitle}>{data[nftType].titles[0]}</p>
          <div className={styles.itemStatInfo}>
            <img
              className={styles.icon}
              src={data[nftType].icons[0]}
              alt={data[nftType].titles[0]}
            />
            <span>{data[nftType].stats[0]}</span>
          </div>
        </div>
        <div className={styles.itemStatContainer}>
          <p className={styles.itemStatTitle}>{data[nftType].titles[1]}</p>
          <div className={styles.itemStatInfo}>
            <img
              className={styles.icon}
              src={data[nftType].icons[1]}
              alt={data[nftType].titles[1]}
            />
            <span>{data[nftType].stats[1]}</span>
          </div>
        </div>
        <div className={styles.itemStatContainer}>
          <p className={styles.itemStatTitle}>{data[nftType].titles[2]}</p>
          <div className={styles.itemStatInfo}>
            <img
              className={styles.icon}
              src={data[nftType].icons[2]}
              alt={data[nftType].titles[2]}
            />
            <span>{data[nftType].stats[2]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
