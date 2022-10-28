import LogoRarity from "../../../NftCard/components/LogoRarity";
import NCoinIcon from "../../../../Assets/img/Sprite_Icon_Reward_35.png";
import { separator } from "../../../../Utils/separator";

import styles from "./styles.module.scss";

const BuyInfo = ({ chosenNft }) => {
  return (
    <div className={styles.buyInfo}>
      <div className={styles.rarity}>
        <LogoRarity rarity={chosenNft?.rarity} />
        <p>{chosenNft?.rarity}</p>
      </div>
      <div className={styles.nftName}>
        <h1>{chosenNft?.itemName}</h1>
        <span>[ {chosenNft?.repName} ]</span>
      </div>
      {chosenNft?.price && (
        <>
          <div className={styles.flex}>
            <span>Price</span>
            <div className={styles.ncoins}>
              <img src={NCoinIcon} alt="NCoin" />
              <b>{separator(chosenNft?.price)} NCoin</b>
            </div>
          </div>
          <div className={styles.flex}>
            <span>Fee</span>
            <div className={styles.ncoins}>
              <img src={NCoinIcon} alt="NCoin" />
              <p>? NCoin</p>
            </div>
          </div>
          <button>Buy</button>
        </>
      )}
    </div>
  );
};

export default BuyInfo;
