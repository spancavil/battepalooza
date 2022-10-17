/* import { separator } from "../../../../Utils/separator"; */
import NCOIN from "../../../../Assets/img/Sprite_Icon_Reward_35.png";
import TESTPACK from "../../../../Assets/img/Packtest.png";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { getDaysMinutesSeconds } from "../../../../Utils/createDate";

export const PackCard = ({ pack, onClick }) => {

  const [timer, setTimer] = useState({ message: "", state: "" });

  useEffect(() => {
    let interval;

    if (Object.keys(pack).length) {
        interval = setInterval(() => {
            let date = getDaysMinutesSeconds(
                pack?.startTime,
                pack?.endTime
            );
            let { message, state } = date;
            const actualDate = { message, state };
            setTimer(actualDate);
        }, 1000);
    }

    return () => {
        clearInterval(interval);
    };

  }, [pack]);

  return (
    <div onClick={onClick} className={styles.pack}>
      <div className={styles.packImgContainer}>
        <div className={styles.img} />
        <img className={styles.packImg} src={TESTPACK} alt="pack" />
      </div>
      <div className={styles.packDataContainer}>
        <h3>Test Pack</h3>
        <p className={styles.desc}>
          The power of the Slayer varies depending on the user. It is said that
          in the past wars, warriors called war ghosts used them.
        </p>
        <span className={styles.left}>
          Left Time: <b>{timer.message}</b>
        </span>
        <span className={styles.left}>
          Left Count: <b>130/1000</b>
        </span>
        <div className={styles.priceContainer}>
          <p>Price</p>
          <div className={styles.price}>
            <img src={NCOIN} alt="icon" />
            <span>
              <b>870,100</b> NCoin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
