import styles from "./styles.module.scss";
import { sendAmplitudeData } from "../../../../Utils/amplitude";
import ModalV2 from "../../../../Global-Components/ModalV2";
import { separator } from "../../../../Utils/separator";
import NCoinIcon from "../../../../Assets/img/Sprite_Icon_Reward_35.png";
import { useContext } from "react";
import { MaintenanceData } from "../../../../Context/MaintenanceProvider";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import SemiFrame from "../../../../Global-Components/NftCard/components/SemiFrame";
import LogoRarity from "../../../../Global-Components/NftCard/components/LogoRarity";

const Checkout = ({ nftBuy, nftProccesing, handleClose }) => {
  const { maintenance } = useContext(MaintenanceData);

  const setRarityCard = (rarity) => {
    return rarity === "Common"
      ? styles.CommonCard
      : rarity === "Rare"
      ? styles.RareCard
      : rarity === "Epic"
      ? styles.EpicCard
      : styles.LegendaryCard;
  };

  const handleProccessing = () => {
    sendAmplitudeData("Buy Confirmation Marketplace");
    nftProccesing(true);
    handleClose(false)
  };

  return (
    <div className={styles.parentContainerModal}>
      <ModalV2 title="Checkout" handleClose={() => handleClose(false)}>
        <div className={styles.packSelected}>
          <div className={setRarityCard(nftBuy?.rarity)}>
            <SemiFrame size="48px" rarity={nftBuy?.rarity} />
            <img
              key={nftBuy?.id}
              src={nftBuy?.thumbnailUrl}
              alt={nftBuy?.itemName}
            />
          </div>
          <div className={styles.rigth}>
            <div className={styles.rarity}>
              <LogoRarity rarity={nftBuy?.rarity} />
              <p>{nftBuy?.rarity}</p>
            </div>
            <p>{nftBuy?.itemName}</p>
          </div>
        </div>

        <div className={styles.line} />
        <div className={styles.paymentData}>
          <h4>Payment summary</h4>
          <div className={styles.item}>
            <p>Subtotal</p>
            <div className={styles.ncoins}>
              <img src={NCoinIcon} alt="NCoin" />
              <span>{separator(nftBuy?.price)} NCoin</span>
            </div>
          </div>
          <div className={styles.item}>
            <p>Fee</p>
            <div className={styles.ncoins}>
              <img src={NCoinIcon} alt="NCoin" />
              <span>? NCoin</span>
            </div>
          </div>
          <div className={styles.item}>
            <p>Total</p>
            <div className={styles.ncoins}>
              <img src={NCoinIcon} alt="NCoin" />
              <span>{separator(nftBuy?.price + 0)} NCoin</span>
            </div>
          </div>
          <ButtonRounded
            title="BUY"
            onClick={
              Object.keys(maintenance).length ? () => {} : handleProccessing
            }
            color={maintenance ? "disabled" : "yellow"}
            additionalStyles={{ zIndex: 0 }}
          />
        </div>
      </ModalV2>
    </div>
  );
};

export default Checkout;
