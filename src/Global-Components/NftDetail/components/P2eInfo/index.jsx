import styles from "./styles.module.scss";
import SERIAL from "../../../../Assets/img/Sprite_Icon_Premium_02.png";
import COPY from "../../../../Assets/img/Sprite_Icon_Premium_05.png";

const P2eInfo = ({ chosenNft }) => {
  return (
    <div className={styles.p2eInfo}>
      <h4>P2E Info</h4>
      <div className={styles.items}>
        <Item img={COPY} text={"P2E Battle Count: ?"} />
        <Item img={SERIAL} text={"Serial Number: #?"} />
      </div>
    </div>
  );
};

const Item = ({ img, text }) => {
  return (
    <div className={styles.item}>
      <img src={img} alt={text} />
      <p>{text}</p>
    </div>
  );
};

export default P2eInfo;
