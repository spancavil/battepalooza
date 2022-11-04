import LogoRarity from '../../../../../Global-Components/NftCard/components/LogoRarity';

import styles from './styles.module.scss'

export const RarityItem = ({ rarity, percentage }) => {
    let color = null;
  
    switch (rarity) {
      case "Common":
        color = "#D9D9D9";
        break;
  
      case "Rare":
        color = "#F9EFB7";
        break;
  
      case "Epic":
        color = "#2959F7";
        break;
  
      case "Legendary":
        color = "#C729F7";
        break;
  
      default:
        break;
    }
  
    return (
      <div style={{ borderColor: color }} className={styles.rarityItem}>
        <LogoRarity rarity={rarity} />
        <p>{rarity}</p>
        <span style={{ color }}>{percentage}%</span>
      </div>
    );
  }