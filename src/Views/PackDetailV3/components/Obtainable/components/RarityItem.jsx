import LogoRarity from "../../../../../Global-Components/NftCard/components/LogoRarity";

import styles from "./styles.module.scss";

export const RarityItem = ({ rarity, percentage }) => {
  let color = null;
  let name = null;

  switch (rarity) {
    case 1:
      color = "#D9D9D9";
      name = "Common";
      break;

    case 2:
      color = "#F9EFB7";
      name = "Rare";
      break;

    case 3:
      color = "#2959F7";
      name = "Epic";
      break;

    case 4:
      color = "#C729F7";
      name = "Legendary";
      break;

    default:
      break;
  }

  return (
    <div style={{ borderColor: color }} className={styles.rarityItem}>
      <LogoRarity rarity={rarity} />
      <p>{name}</p>
      <span style={{ color }}>{percentage}%</span>
    </div>
  );
};
