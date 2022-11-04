import LogoRarity from "../../../NftCard/components/LogoRarity";
import NCoinIcon from "../../../../Assets/img/Sprite_Icon_Reward_35.png";
import { separator } from "../../../../Utils/separator";

import styles from "./styles.module.scss";
import ButtonRounded from "../../../ButtonRounded";

const BuyInfo = ({ chosenNft, handleAction }) => {
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
          <ButtonRounded
            color="yellow"
            onClick={() => handleAction("buy")}
            title="BUY"
            additionalStyles={{
              zIndex: 0,
            }}
          />
        </>
      )}
      {typeof chosenNft?.salesState === "number" &&
        chosenNft?.salesState === 0 && (
          <>
            <ButtonRounded
              color="yellow"
              onClick={() => handleAction("register")}
              title="REGISTER IN MARKETPLACE"
              additionalStyles={{
                zIndex: 0,
              }}
            />
          </>
        )}
      {typeof chosenNft?.salesState === "number" &&
        chosenNft?.salesState === 1 && (
          <>
            <ButtonRounded
              color="yellow"
              onClick={() => handleAction("unregister")}
              title="UNREGISTER MARKETPLACE"
              additionalStyles={{
                zIndex: 0,
              }}
            />
          </>
        )}
    </div>
  );
};

export default BuyInfo;
