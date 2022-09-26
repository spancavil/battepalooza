import LegendaryIcon from "../../../../../../Assets/img/LegendaryIcon.png";
import CommonIcon from "../../../../../../Assets/img/CommonIcon.png";
import RareIcon from "../../../../../../Assets/img/RareIcon.png";
import EpicIcon from "../../../../../../Assets/img/EpicIcon.png";
import ButtonRounded from "../../../../../../Global-Components/ButtonRounded";

import styles from "./styles.module.scss";

const Description = ({ chosenNft }) => {
  const getNftRarity = () => {
    switch (chosenNft?.rarity) {
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
    <div className={styles.first}>
      <div className={setRarityCard(chosenNft?.rarity)}>{getNftRarity()}</div>
      <div className={styles.title}>
        <h3>Crimson Seer</h3>
        <span>[Slayer]</span>
      </div>
      <p className={styles.description}>
        The power of the Slayer varies depending on the user. It is said that in
        the past wars, warriors called war ghosts used them.
      </p>
      <div className={styles.line} />
      <ButtonRounded
        title={`BUY ${chosenNft?.price} NCoins`}
        onClick={() => console.log("BUY")}
        color="blue"
        additionalStyles={{
          color: "black",
          backgroundColor: "#1892f0",
          height: "48px",
          fontSize: "14px",
          width: "100%",
        }}
      />
      <div className={styles.feeAndSeller}>
        <span>Fee: XXXXXXXXXXX</span>
        <span>Seller: XXXXXXXXXXX</span>
      </div>
    </div>
  );
};

export default Description;