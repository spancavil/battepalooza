import Button from "../../../../Global-Components/Button";
import styles from "./styles.module.scss";
import COMMON from "../../Assets/Tiericon_common.png";
import RARE from "../../Assets/Tiericon_Rare.png";
import EPIC from "../../Assets/Tiericon_Epic.png";
import LEGENDARY from "../../Assets/Tiericon_Legendary.png";

const NftCard = ({ nft, showNft }) => {
  return (
    <div
      className={
        nft.rarity === "COMMON"
          ? styles.borderCommon
          : nft.rarity === "RARE"
            ? styles.borderRare
            : nft.rarity === "EPIC"
              ? styles.borderEpic
              : styles.borderLegendary
      }
    >
      <div className={styles.cardDropDetail}>
        <div className={styles.cardTop}>
          <div className={styles.rarityContainer}>
            <img
              src={
                nft.rarity === "COMMON"
                  ? COMMON
                  : nft.rarity === "RARE"
                    ? RARE
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
        <h3> Max playcount: {nft.maxPlayCount}</h3>
        <h3> Max daily playcount: {nft.maxDailyPlayCount}</h3>
        <Button title={`BUY ${nft.price} nCoin`} onClick={() => showNft(nft)} />
      </div>
    </div>
  );
};

export default NftCard;
