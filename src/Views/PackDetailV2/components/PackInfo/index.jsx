import NftCard from "../../../../Global-Components/NftCard";

import styles from "./styles.module.scss";

export const PackInfo = ({ pack }) => {
  const nftsTest = [
    {
      uniqueId: "983235971287250685025551072688264024413005647533",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 17500,
      type: 2,
      itemId: 1045,
      itemName: "White killer",
      repName: "Bow",
      rarity: "Epic",
      clan: "NEN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/WhiteKiller_Epic.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_05_Pre3.png",
      maxPlayCount: 323,
    },
    {
      uniqueId: "983235971287250685025551072688264024413005647533",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 17500,
      type: 2,
      itemId: 1045,
      itemName: "White killer",
      repName: "Bow",
      rarity: "Epic",
      clan: "NEN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/WhiteKiller_Epic.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_05_Pre3.png",
      maxPlayCount: 323,
    },
    {
      uniqueId: "983235971287250685025551072688264024413005647533",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 17500,
      type: 2,
      itemId: 1045,
      itemName: "White killer",
      repName: "Bow",
      rarity: "Epic",
      clan: "NEN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/WhiteKiller_Epic.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_05_Pre3.png",
      maxPlayCount: 323,
    },
    {
      uniqueId: "983235971287250685025551072688264024413005647533",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 17500,
      type: 2,
      itemId: 1045,
      itemName: "White killer",
      repName: "Bow",
      rarity: "Epic",
      clan: "NEN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/WhiteKiller_Epic.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_05_Pre3.png",
      maxPlayCount: 323,
    },
  ];

  return (
    <div className={styles.packInfo}>
      <div className={styles.left}>
        <h2 className={styles.title}>{pack?.packName}</h2>
        <p className={styles.desc}>
          {pack?.detailTxt &&
            pack?.detailTxt
              .split("\\n")
              .map((texto, i) => <p key={i}>{texto}</p>)}
        </p>
        <h4 className={styles.subtitle}>NFTs you can get</h4>
        <div className={styles.nfts}>
          {nftsTest.map((nft, i) => (
            <NftCard nft={nft} key={i} />
          ))}
        </div>
        <button className={styles.viewAll}>View All</button>
      </div>
      <div className={styles.right}>
        <h4 className={styles.subtitleBuy}>{pack?.price} nCoin</h4>
        <h4 className={styles.subtitleBuy}>Get your first NFTs right away!</h4>
        <span className={styles.descBuy}>
          Welcome to Battlepalooza! Get a [{pack?.packName}] and start
          collecting the NFTs!
        </span>
        <button className={styles.buy}>Buy</button>
        <button className={styles.buyNcoin}>Buy with ncoins</button>
      </div>
    </div>
  );
};
