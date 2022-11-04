import LogoRarity from "../../../../Global-Components/NftCard/components/LogoRarity";
import { PremiumBuffItems } from "./components/PremiumBuffItem";
import { RarityItem } from "./components/RarityItem";
import styles from "./styles.module.scss";

const Obtainable = ({ pack, setCheckoutNCoin }) => {
  console.log(pack);

  const rarityItems = [
    {
      rarity: "Common",
      percentage: 65,
    },
    {
      rarity: "Rare",
      percentage: 20,
    },
    {
      rarity: "Epic",
      percentage: 10,
    },
    {
      rarity: "Legendary",
      percentage: 5,
    },
  ];

  return (
    <div className={styles.obtainableContainer}>
      <div className={styles.left}>
        <div className={styles.box}>
          <h4>Rarity Rate</h4>
          <div className={styles.rarityItems}>
            {rarityItems.map((rarityItem) => (
              <RarityItem
                rarity={rarityItem.rarity}
                percentage={rarityItem.percentage}
              />
            ))}
          </div>
        </div>
        <div className={styles.box}>
          <h4>Obtainable Premium Buffs</h4>
          <div className={styles.premiumBuffItems}>
            {[0, 1, 2, 3, 4].map((x) => (
              <PremiumBuffItems />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.rigth}>
        <h4>Obtainable NFTs</h4>
      </div>
    </div>
  );
};

export default Obtainable;
