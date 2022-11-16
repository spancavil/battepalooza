import LogoRarity from "../../../../../Global-Components/NftCard/components/LogoRarity";

import styles from "./styles.module.scss";

export const RarityItem = ({ rarity, percentage }) => {
  const rarities = {
    1: {
      color: "#EBEBEB",
      name: "Common",
    },
    2: {
      color: "#54F952",
      name: "Rare",
    },
    3: {
      color: "#3C92E7",
      name: "Epic",
    },
    4: {
      color: "#B922E3",
      name: "Legendary",
    },
  };

  return (
    <div
      style={{ borderColor: rarities[rarity]?.color }}
      className={styles.rarityItem}
    >
      <LogoRarity rarity={rarities[rarity]?.name} />
      <p>{rarities[rarity]?.name}</p>
      <span style={{ color: rarities[rarity]?.color }}>{percentage}%</span>
    </div>
  );
};
