import LegendaryIcon from "../../../../Assets/img/LegendaryIcon.png";
import CommonIcon from "../../../../Assets/img/CommonIcon.png";
import RareIcon from "../../../../Assets/img/RareIcon.png";
import EpicIcon from "../../../../Assets/img/EpicIcon.png";

import styles from "./styles.module.scss";
import { Fragment } from "react";
import ButtonRounded from "../../../ButtonRounded";

const Description = ({ chosenNft, register, unRegister, buy }) => {

  console.log(chosenNft.price);
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
        <h3>{chosenNft?.itemName}</h3>
        <span>[{chosenNft?.repName}]</span>
      </div>
      <p className={styles.description}>
        {chosenNft?.storyText &&
          chosenNft?.storyText
            .split("\\n")
            .map((texto, i) => <Fragment key={i}>{texto}</Fragment>)}
      </p>

      {chosenNft?.price && (
        <>
          <div className={styles.line} />
          <ButtonRounded
            title={`BUY ${chosenNft?.price} NCoins`}
            onClick={()=> console.log('BUY')}
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
            <span>Fee: ?</span>
            <span>Seller: {chosenNft?.sellerName}</span>
          </div>
        </>
      )}
      {!chosenNft?.price && chosenNft?.salesState === 0 && (
        <>
          <div className={styles.line} />
          <ButtonRounded
            title={`REGISTER IN MARKETPLACE`}
            onClick={() => register()}
            color="blue"
            additionalStyles={{
              color: "black",
              backgroundColor: "#1892f0",
              height: "48px",
              fontSize: "14px",
              width: "100%",
            }}
          />
        </>
      )}
      {!chosenNft?.price && chosenNft?.salesState === 1 && (
        <>
          <div className={styles.line} />
          <ButtonRounded
            title={`UNREGISTER FROM MARKETPLACE`}
            onClick={() => unRegister()}
            color="blue"
            additionalStyles={{
              color: "black",
              backgroundColor: "#1892f0",
              height: "48px",
              fontSize: "14px",
              width: "100%",
              zIndex: 0,
            }}
          />
        </>
      )}
    </div>
  );
};

export default Description;
