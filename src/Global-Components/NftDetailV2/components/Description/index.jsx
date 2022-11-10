import LeftP2e from "../../../../Assets/img/Sprite_Icon_Premium_05.png";

import styles from "./styles.module.scss";

const Description = ({ chosenNft }) => {

  console.log(chosenNft);
  return (
    <div className={styles.description}>
      <h3>Description</h3>
      <span className={styles.soldBy}>
        Sold by <b>{chosenNft?.sellerName}</b>
      </span>
      <p className={styles.serial}>Serial: {chosenNft?.serial}</p>
      <div>
        {chosenNft?.ability?.text &&
          chosenNft?.ability?.text.split("\\n").map((texto, i) => (
            <span key={i} className={styles.descriptionText}>
              {texto}
            </span>
          ))}
      </div>
      <h4>P2E Info</h4>
      <h5>Left times to P2E</h5>
      <div className={styles.p2eLeft}>
        <img src={LeftP2e} alt="Left p2e" />
        <p>{Number(chosenNft?.maxPlayCount) - Number(chosenNft?.playCount) || "?"} Left</p>
      </div>
    </div>
  );
};

export default Description;
