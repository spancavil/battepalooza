import SemiFrame from "../../../../../Global-Components/NftCard/components/SemiFrame";
import Tooltip from "../../../../../Global-Components/Tooltip";
import styles from "./styles.module.scss";

export const ObtainableNft = ({ item, onHover, weaponOrCharHover, index }) => {
  const setRarityCard = (rarity) => {
    return rarity === "Common"
      ? styles.CommonCard
      : rarity === "Rare"
      ? styles.RareCard
      : rarity === "Epic"
      ? styles.EpicCard
      : styles.LegendaryCard;
  };
  return (
    <div 
      className={setRarityCard(item?.rarity)} 
      onMouseEnter={() => onHover(item)}
    >
      <SemiFrame size="80px" rarity={item?.rarity} />
      <img key={item?.id} src={item?.portrait} alt={item?.itemName} />
      {weaponOrCharHover?.id === item?.id ? 
        <Tooltip
          weaponOrCharacter={weaponOrCharHover}
          buffs = {null}
          index = {index}
        /> 
        : 
        null}
    </div>
  );
};
