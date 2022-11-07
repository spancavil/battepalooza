import { ClockIcon, PackageIcon } from "../../../../Assets/svg/packDetailIcons";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import Timer from "../../../../Global-Components/Timer";
import {useContext} from 'react';

import styles from "./styles.module.scss";
import { UserData } from "../../../../Context/UserProvider";
import fireToast from "../../../../Utils/sweetAlert2";
import { MaintenanceData } from "../../../../Context/MaintenanceProvider";

const PackDescription = ({ pack, setCheckoutNCoin }) => {

  console.log(pack);

  const {userData} = useContext(UserData)
  const {maintenance} = useContext(MaintenanceData);

  const handleBuy = () => {
    if(userData?.bpToken && !maintenance) {
      setCheckoutNCoin(true);
    }
    if (!userData?.bpToken) {
      fireToast("Need login", 1200, "300px");
    }
  }

  return (
    <div className={styles.packDescription}>
      <div className={styles.imgContainer}>
        <img src={pack?.thumbnailUrl} alt="" />
      </div>
      <div className={styles.packData}>
        <h3>{pack?.packName}</h3>
        <p className={styles.description}>
          {pack?.detailTxt ? pack?.detailTxt : "Detail text not found"}
        </p>
        <div className={styles.leftsContainer}>
          <div className={styles.box}>
            <div>
              <ClockIcon />
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
              <PackageIcon />
            </div>
            <div className={styles.texts}>
              <p>Left Time</p>
              <Timer pack={pack} />
            </div>
          </div>
          <ButtonRounded 
            title="Buy pack" 
            onClick={ Object.keys(maintenance).length
                                    ? () => {} 
                                    : handleBuy
                                    }
            color = {maintenance ? "disabled" : "blue"}
            additionalStyles={{zIndex: 0}}/>
        </div>
      </div>
    </div>
  );
};

export default PackDescription;
