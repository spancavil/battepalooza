import Button from "../../../../Global-Components/Button";
import styles from "./styles.module.scss";
import COMMON from "../../Assets/Tiericon_common.png";
import EPIC from "../../Assets/Tiericon_Epic.png";
import LEGENDARY from "../../Assets/Tiericon_Legendary.png";

const NftCard = ({ nft }) => {
  console.log(nft);

  return (
    <div className={styles.cardDropDetail}>
      <div className={styles.cardTop}>
        <div className={styles.rarityContainer}>
          <img
            src={
              nft.rarity === "COMMON"
                ? COMMON
                : nft.rarity === "EPIC"
                ? EPIC
                : LEGENDARY
            }
            alt={nft.rarity}
          />
          <p>{nft.rarity}</p>
        </div>
        <p className={styles.amount}>
          {nft.leftAmount} / {nft.limitAmount}
        </p>
      </div>
      <div className={styles.imgContainer}>
        <img src={nft.thumbnailUrl} alt={nft.itemName} />
      </div>
      <h3>{nft.itemName}</h3>
      <Button title={`Buy ${nft.price} NCoin`} />
    </div>
  );
};

export default NftCard;
