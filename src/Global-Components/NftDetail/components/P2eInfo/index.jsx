import styles from "./styles.module.scss";
import SERIAL from "../../../../Assets/img/Sprite_Icon_Premium_02.png";
import BATTLECOUNT from "../../../../Assets/img/Sprite_Icon_Premium_03.png";
import BONUS from "../../../../Assets/img/Sprite_Icon_Premium_04.png";
import COPY from "../../../../Assets/img/Sprite_Icon_Premium_05.png";
import DAILY from "../../../../Assets/img/Sprite_Icon_Reward_35.png";

const P2eInfo = ({ chosenNft }) => {
  console.log(chosenNft);

  return (
    <div className={styles.p2eInfo}>
      <h4>P2E Info</h4>
      <div className={styles.items}>
        <Item img={DAILY} text={`Daily gNCoin Battle Count: 1 / 33`} />
        <Item img={SERIAL} text={"Serial Number: #1"} />
        <Item img={BATTLECOUNT} text={"gNCoin Battle Count: 0 / 281"} />
        <Item img={BONUS} text={"Bonus: 1"} />
        <Item img={COPY} text={"Copy:"} />
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
