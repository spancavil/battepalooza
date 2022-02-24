import React from "react";
import styles from "./styles.module.scss";

const Nft = ({ nft, tilt, index }) => {
  console.log(tilt);
  return (
    <div ref={tilt} className={styles.cardNft} key={nft.itemId}>
      {/* El source luego cambiara en base al asset */}
      <img className={styles.imgNft} src={nft.thumbnailUrl} alt="nft-thumb" />
      <div className={styles.texts}>
        <p>{nft.repName}</p>
        <p>{nft.itemName}</p>
        <p className={styles.text2}>{nft.rarity}</p>
        {/* <p>#{nft.itemId}</p> */}
        <p>
          gNCoin Battle Count: {nft.playCount}/{nft.maxPlayCount}
        </p>
        {nft.salesState === 1 && (
          <p className={styles.price}>{nft.price} NCoin</p>
        )}
      </div>
    </div>
  );
};

export default Nft;

