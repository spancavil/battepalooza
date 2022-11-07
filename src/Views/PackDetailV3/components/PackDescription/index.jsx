import { ClockIcon, PackageIcon } from "../../../../Assets/svg/packDetailIcons";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import Timer from "../../../../Global-Components/Timer";
import NCoinIcon from "../../../../Assets/img/Sprite_Icon_Reward_35.png";
import { useContext } from "react";

import styles from "./styles.module.scss";
import { UserData } from "../../../../Context/UserProvider";
import fireToast from "../../../../Utils/sweetAlert2";
import { separator } from "../../../../Utils/separator";
import { MaintenanceData } from "../../../../Context/MaintenanceProvider";

const PackDescription = ({ pack, setCheckoutNCoin }) => {
  console.log(pack);

  const { userData } = useContext(UserData);
  const { maintenance } = useContext(MaintenanceData);

  const handleBuy = () => {
    if (userData?.bpToken && !maintenance) {
      setCheckoutNCoin(true);
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
          {pack?.price && <b>{separator(pack?.price)} NCoin</b>}
        </div>
        <ButtonRounded
          title="Buy pack"
          onClick={handleBuy}
          additionalStyles={{ zIndex: 0 }}
        />
      </div>
    </div>
  );
};

export default PackDescription;
