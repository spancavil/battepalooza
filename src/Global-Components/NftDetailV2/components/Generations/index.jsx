import NftCard from "../../../../../../Global-Components/NftCard";
import styles from "./styles.module.scss";

const Generations = () => {
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
  ];

  return (
    <div className={styles.generations}>
      <h4>Older generation</h4>
      <div className={styles.grid}>
        <NftCard nft={nftsTest[0]} />
        <NftCard nft={nftsTest[1]} />
      </div>
      <h4>Same generation</h4>
      <div className={styles.grid}>
        <NftCard nft={nftsTest[0]} />
        <NftCard nft={nftsTest[1]} />
      </div>
      <h4>Lower generation</h4>
      <div className={styles.grid}>
        <NftCard nft={nftsTest[0]} />
        <NftCard nft={nftsTest[1]} />
      </div>
    </div>
  );
};

export default Generations;
