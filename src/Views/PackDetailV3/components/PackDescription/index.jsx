import { useEffect, useState } from "react";
import { ClockIcon, PackageIcon } from "../../../../Assets/svg/packDetailIcons";
import { getDaysMinutesSeconds } from "../../../../Utils/createDate";
import styles from "./styles.module.scss";

const PackDescription = ({ pack }) => {
  const [timer, setTimer] = useState({ message: "", state: "" });

  useEffect(() => {
    let interval;

    if (pack) {
      if (Object.keys(pack).length) {
        interval = setInterval(() => {
          let date = getDaysMinutesSeconds(pack?.startTime, pack?.endTime);
          let { message, state } = date;
          const actualDate = { message, state };
          setTimer(actualDate);
        }, 1000);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [pack]);

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
              <span>{timer.message}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackDescription;
