import { separator } from "../../Utils/separator";

import LegendaryIcon from "../../Assets/img/LegendaryIcon.png";
import CommonIcon from "../../Assets/img/CommonIcon.png";
import RareIcon from "../../Assets/img/RareIcon.png";
import EpicIcon from "../../Assets/img/EpicIcon.png";

import styles from "./styles.module.scss";

const NftCard = ({ nft, tilt, onClick, withPrice }) => {
  const getNftRarity = () => {
    switch (nft.rarity) {
      case "Common":
        return (
          <div className={styles.rarity}>
            <img src={CommonIcon} alt="Common" />
            <p>Common</p>
          </div>
        );

      case "Rare":
        return (
          <div className={styles.rarity}>
            <img src={RareIcon} alt="Rare" />
            <p>Rare</p>
          </div>
        );

      case "Epic":
        return (
          <div className={styles.rarity}>
            <img src={EpicIcon} alt="Epic" />
            <p>Epic</p>
          </div>
        );

      case "Legendary":
        return (
          <div className={styles.rarity}>
            <img src={LegendaryIcon} alt="Legendary" />
            <p>Legendary</p>
          </div>
        );

      default:
        break;
    }
  };

  const setRarityCard = (rarity) => {
    return rarity === "Common"
      ? styles.CommonCard
      : rarity === "Rare"
      ? styles.RareCard
      : rarity === "Epic"
      ? styles.EpicCard
      : styles.LegendaryCard;
  };

  return (
    <div
      ref={tilt && tilt}
      onClick={onClick && (() => onClick())}
      className={setRarityCard(nft?.rarity)}
    >
      <>{getNftRarity()}</>
      <h3>{nft?.itemName}</h3>
      <div className={styles.center}>
        <img className={styles.imgNft} src={nft.thumbnailUrl} alt="nft-thumb" />
        {withPrice && <span>{separator(nft?.price)} nCoin</span>}
      </div>
    </div>
  );
};

export default NftCard;
