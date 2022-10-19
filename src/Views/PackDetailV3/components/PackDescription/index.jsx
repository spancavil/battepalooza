import { ClockIcon, PackageIcon } from "../../../../Assets/svg/packDetailIcons";
import Timer from "../../../../Global-Components/Timer";

import styles from "./styles.module.scss";

const PackDescription = ({ pack }) => {

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
        </div>
      </div>
    </div>
  );
};

export default PackDescription;
