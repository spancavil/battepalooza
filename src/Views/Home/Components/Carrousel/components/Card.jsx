import React from "react";
import styles from "./styles.module.scss";

const Card = ({ nft, onClick }) => {
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
      <div
        className={styles.cardNft}
        key={nft.itemId}
        onClick={() => onClick(nft.uniqueId, nft.sellerPid)}
      >
        {/* El source luego cambiara en base al asset */}
        <img className={styles.imgNft} src={nft.thumbnailUrl} alt="nft-thumb" />
        <div className={styles.texts}>
          <p className={styles.itemName}>{nft.itemName}</p>
          <p>{nft.repName}</p>
          <p className={styles.text2}>{nft.rarity}</p>
          <p className={styles.price}>{nft.price} NCoin</p>
          {/* <p> Play count: {nft.playCount}</p>
          <p> Daily play count: {nft.maxPlayCount}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
