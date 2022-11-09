import React, { useContext } from "react";
import styles from "./styles.module.scss";
import NCoinIcon from "../../../../Assets/img/Sprite_Icon_Reward_35.png";
import { UserData } from "../../../../Context/UserProvider";
import fireToast from "../../../../Utils/sweetAlert2";
import ModalV2 from "../../../../Global-Components/ModalV2";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import { MaintenanceData } from "../../../../Context/MaintenanceProvider";
import PackCounter from "../PackCounter";
import { separator } from "../../../../Utils/separator";
// import { sendAmplitudeData } from '../../../../Utils/amplitude';

const Checkout = ({
  packBuy,
  nftProccesing,
  handleClose,
  quantity,
  setPackCount,
}) => {
  const { userData } = useContext(UserData);
  const { maintenance } = useContext(MaintenanceData);

  const handleProccessing = () => {
    // sendAmplitudeData('Buy Confirmation Drop');
    if (Object.keys(userData).length !== 0) {
      nftProccesing(true);
      handleClose(false);
    } else {
      fireToast("Need login", 1000);
    }
  };

  return (
    <div className={styles.parentContainerModal}>
      <ModalV2 title="Checkout" handleClose={() => handleClose(false)}>
        <div className={styles.packSelected}>
          <div className={styles.pack}>
            <img src={packBuy?.thumbnailUrl} alt={packBuy?.packName} />
            <span>{packBuy?.packName}</span>
          </div>
          <PackCounter
            quantity={quantity}
            handleValue={setPackCount}
            additionalStyles={{ width: "35%" }}
          />
        </div>
        <div className={styles.line} />
        <div className={styles.paymentData}>
          <h4>Payment summary</h4>
          <div className={styles.item}>
            <p>Subtotal</p>
            <div className={styles.ncoins}>
              <img src={NCoinIcon} alt="NCoin" />
              <span>{separator(packBuy?.price)} NCoin</span>
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
              <span>{separator(packBuy?.price * quantity + 0)} NCoin</span>
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
