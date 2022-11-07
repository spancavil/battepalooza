import SemiFrame from "../../../../../Global-Components/NftCard/components/SemiFrame";

import styles from "./styles.module.scss";

export const ObtainableNft = ({ item }) => {
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
    <div className={setRarityCard(item?.rarity)}>
      <SemiFrame size="80px" rarity={item?.rarity} />
      <img key={item?.id} src={item?.portrait} alt={item?.itemName} />
    </div>
  );
};
