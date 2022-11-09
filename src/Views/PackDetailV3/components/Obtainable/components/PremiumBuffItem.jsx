import Tooltip from "../../../../../Global-Components/Tooltip";
import styles from "./styles.module.scss";

export const PremiumBuffItems = ({ item, onHover, buffsHover, index }) => {

  return (
    <div 
      className={styles.premiumBuffItem} 
      onMouseEnter = {()=> onHover(item)}
    >
      <img src={item?.icon} alt={item?.engName} />
      {buffsHover && buffsHover[0]?.id === item?.id ? 
        <Tooltip
          buffs = {buffsHover}
          index = {index}
        /> 
        : 
        null}
    </div>
  );
};
