import Pack from "../../../../Assets/img/pack1.png";

import styles from "./styles.module.scss";

export const FirstPack = ({ packData, timerRelease, onClick }) => {
  console.log(packData);
  return (
    <div onClick={onClick} className={styles.firstPack}>
      <div className={styles.imgContainer}>
        <img src={Pack} alt="pack" />
      </div>
      <div className={styles.texts}>
        <div className={styles.time}>
          <p>{timerRelease.message}</p>
          <span>DAYS HRS MINS</span>
        </div>
        <div className={styles.desc}>
          <p>{packData?.packInfo?.name}</p>
          <span>{packData?.packInfo?.desc}</span>
        </div>
      </div>
    </div>
  );
};
