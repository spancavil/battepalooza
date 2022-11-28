import LogoRarity from "../../../NftCard/components/LogoRarity";
import NCoinIcon from "../../../../Assets/img/Sprite_Icon_Reward_35.png";
import { separator } from "../../../../Utils/separator";

import ButtonRounded from "../../../ButtonRounded";
import { useContext } from "react";
import { MaintenanceData } from "../../../../Context/MaintenanceProvider";
/* import useTransactionNft from "../../../../Hooks/useTransactionNft"; */

import styles from "./styles.module.scss";

const BuyInfo = ({ chosenNft, handleAction, openModalBurn }) => {
  const { maintenance } = useContext(MaintenanceData);

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
              <p>0 NCoin</p>
            </div>
          </div>
          <span style={{ textAlign: "right" }}>
            You should pay 1NCoin for the gas fee only for your first purchase
          </span>
          <ButtonRounded
            color={Object.keys(maintenance).length ? "disabled" : "yellow"}
            onClick={
              Object.keys(maintenance).length
                ? () => {}
                : () => handleAction("buy")
            }
            title="BUY"
          />
        </>
      )}
      {typeof chosenNft?.salesState === "number" &&
        chosenNft?.salesState === 0 && (
          <>
            <ButtonRounded
              color={Object.keys(maintenance).length ? "disabled" : "yellow"}
              onClick={
                Object.keys(maintenance).length
                  ? () => {}
                  : () => handleAction("register")
              }
              title="REGISTER IN MARKETPLACE"
            />
            <ButtonRounded
              color={
                Object.keys(maintenance).length ? "disabled" : "inlineYellow"
              }
              title="BURN NFT"
              onClick={
                Object.keys(maintenance).length ? () => {} : openModalBurn
              }
            />
          </>
        )}
      {typeof chosenNft?.salesState === "number" &&
        chosenNft?.salesState === 1 && (
          <>
            <ButtonRounded
              color={Object.keys(maintenance).length ? "disabled" : "yellow"}
              onClick={
                Object.keys(maintenance).length
                  ? () => {}
                  : () => handleAction("unregister")
              }
              title="UNREGISTER MARKETPLACE"
            />
          </>
        )}
    </div>
  );
};

export default BuyInfo;
