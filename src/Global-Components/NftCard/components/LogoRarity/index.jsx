import React from "react";
import LegendaryIcon from "../../../../Assets/img/LegendaryIcon.png";
import CommonIcon from "../../../../Assets/img/CommonIcon.png";
import RareIcon from "../../../../Assets/img/RareIcon.png";
import EpicIcon from "../../../../Assets/img/EpicIcon.png";
import styles from "./styles.module.scss";

const LogoRarity = ({ rarity }) => {
  switch (rarity) {
    case "Common" | 1:
      return (
        <div className={styles.rarityCommon}>
          <img className={styles.imagen} src={CommonIcon} alt="Common" />
        </div>
      );

    case "Rare" | 2:
      return (
        <div className={styles.rarityRare}>
          <img className={styles.imagen} src={RareIcon} alt="Rare" />
        </div>
      );

    case "Epic" | 3:
      return (
        <div className={styles.rarityEpic}>
          <img className={styles.imagen} src={EpicIcon} alt="Epic" />
        </div>
      );

    case "Legendary" | 4:
      return (
        <div className={styles.rarityLegendary}>
          <img className={styles.imagen} src={LegendaryIcon} alt="Legendary" />
        </div>
      );
    default:
      return null;
  }
};

export default LogoRarity;
