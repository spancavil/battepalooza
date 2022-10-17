import { ClockIcon, PackageIcon } from "../../../../Assets/svg/packDetailIcons";
import styles from "./styles.module.scss";

const PackDescription = ({ pack }) => {
  return (
    <div className={styles.packDescription}>
      <div className={styles.imgContainer}>
        <img src={pack?.thumbnailUrl} alt="" />
      </div>
      <div className={styles.packData}>
        <h3>Test Pack</h3>
        <p className={styles.description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it.
        </p>
        <div className={styles.leftsContainer}>
          <div className={styles.box}>
            <div>
              <ClockIcon />
            </div>
            <div className={styles.texts}>
              <p>Left Count</p>
              <span>130/1000</span>
            </div>
          </div>
          <div className={styles.box}>
            <div>
              <PackageIcon />
            </div>
            <div className={styles.texts}>
              <p>Left Time</p>
              <span>00:23:59:59</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackDescription;
