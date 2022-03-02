import React from "react";
import styles from "./styles.module.scss";

const Nft = ({ nft, tilt, onClick }) => {

  return (
    <div
      ref={tilt}
      className={styles.cardNft}
      key={nft.itemId}
      onClick={() => onClick(nft.uniqueId, nft.sellerPid)}
    >
      {/* El source luego cambiara en base al asset */}
      <img className={styles.imgNft} src={nft.thumbnailUrl} alt="nft-thumb" />
      <div className={styles.texts}>
        <p>{nft.repName}</p>
        <p>{nft.itemName}</p>
        <p className={styles.text2}>{nft.rarity}</p>
        <p className={styles.price}>{nft.price} NCoin</p>
      </div>
    </div>
  );
};

export default Nft;
