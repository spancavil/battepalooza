import styles from "./styles.module.scss";

export const PremiumBuffItems = ({ item }) => {
  return (
    <div className={styles.premiumBuffItem}>
      <img src={item?.icon} alt={item?.engName} />
    </div>
  );
};
