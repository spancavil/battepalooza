import Button from "../../../../Global-Components/Button";
import styles from "./styles.module.scss";
import COMMON from "../../Assets/Tiericon_common.png";
import RARE from "../../Assets/Tiericon_Rare.png";
import EPIC from "../../Assets/Tiericon_Epic.png";
import LEGENDARY from "../../Assets/Tiericon_Legendary.png";

const NftCard = ({ nft, showNft, tilt }) => {
  return (
    <div
      ref={tilt}
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
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", width: '100%', overflow: 'visible', paddingTop: '20px'}}>
          <h3 className={styles.name}>{nft.itemName}</h3>
          {/* <h3 className={styles.count}> Max playcount: {nft.maxPlayCount}</h3>
          <h3 className={styles.count2}> Max daily playcount: {nft.maxDailyPlayCount}</h3> */}
          <Button title={`${nft.price} nCoin`} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%'
          }} onClick={() => showNft(nft)} />
        </div>
      </div>
    </div>
  );
};

export default NftCard;
