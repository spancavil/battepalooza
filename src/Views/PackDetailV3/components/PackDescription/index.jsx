import { ClockIcon, PackageIcon } from "../../../../Assets/svg/packDetailIcons";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import Timer from "../../../../Global-Components/Timer";
import NCoinIcon from "../../../../Assets/img/Sprite_Icon_Reward_35.png";
import { useContext, useState } from "react";

import styles from "./styles.module.scss";
import { UserData } from "../../../../Context/UserProvider";
import fireToast from "../../../../Utils/sweetAlert2";
import { separator } from "../../../../Utils/separator";
import { MaintenanceData } from "../../../../Context/MaintenanceProvider";
import PackCounter from "../PackCounter";

const PackDescription = ({ pack, setCheckoutNCoin, setPackCount }) => {
  const { userData } = useContext(UserData);
  const { maintenance } = useContext(MaintenanceData);

  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    if (userData?.bpToken && !maintenance) {
      setCheckoutNCoin(true);
      setPackCount(quantity);
    }
    if (!userData?.bpToken) {
      fireToast("Need login", 1200, "300px");
    }
  };

  return (
    <div className={styles.packDescription}>
      <div className={styles.imgContainer}>
        <img src={pack?.thumbnailUrl} alt="" />
      </div>
      <div className={styles.packData}>
        <h3>{pack?.packName}</h3>
        <div className={styles.description}>
          {pack?.detailTxt &&
            pack?.detailTxt.split("\\n").map((texto) => {
              return (
                <p key={texto} className={styles.texto}>
                  {texto}
                </p>
              );
            })}
        </div>
        <div className={styles.leftsContainer}>
          <div className={styles.box}>
            <div>
              <PackageIcon />
            </div>
            <div className={styles.texts}>
              <p>Left Count</p>
              <span>
                {pack?.leftAmount}/{pack?.limitAmount}
              </span>
            </div>
          </div>
          <div className={styles.box}>
            <div>
              <ClockIcon />
            </div>
            <div className={styles.texts}>
              <p>Left Time</p>
              <Timer pack={pack} />
            </div>
          </div>
        </div>
        <div className={styles.ncoins}>
          <img src={NCoinIcon} alt="NCoin" />
          {pack?.price && <b>{separator(pack?.price * quantity)} NCoin</b>}
        </div>
        <div className={styles.buttons}>
          <PackCounter
            handleValue={setQuantity}
            additionalStyles={{ width: "100%" }}
          />
          <ButtonRounded
            title="BUY"
            onClick={Object.keys(maintenance).length ? () => {} : handleBuy}
            color={maintenance ? "disabled" : "yellow"}
          />
        </div>
      </div>
    </div>
  );
};

export default PackDescription;
