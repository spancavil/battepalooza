import NCOIN from "../../../../Assets/img/Sprite_Icon_Reward_35.png";
import Timer from "../../../../Global-Components/Timer";

import styles from "./styles.module.scss";
import { separator } from "../../../../Utils/separator";

export const PackCard = ({ pack, onClick }) => {
  return (
    <div onClick={onClick} className={styles.pack}>
      <div className={styles.packImgContainer}>
        <div className={styles.img} />
        <img className={styles.packImg} src={pack?.thumbnailUrl} alt="pack" />
      </div>
      <div className={styles.packDataContainer}>
        <h3>{pack?.packName}</h3>
        <p className={styles.desc}>
          {pack?.detailTxt &&
            pack?.detailTxt.split("\\n").map((texto) => {
              return (
                <p key={texto} className={styles.texto}>
                  {texto}
                </p>
              );
            })}
        </p>
        <span className={styles.left}>
          Left Time: <Timer pack={pack} />
        </span>
        <span className={styles.left}>
          Left Count:
          <b>
            {pack?.leftAmount}/{pack?.limitAmount}
          </b>
        </span>
        <div className={styles.priceContainer}>
          <p>Price</p>
          <div className={styles.price}>
            <img src={NCOIN} alt="icon" />
            <span>
              <b>{separator(pack?.price)}</b> NCoin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
