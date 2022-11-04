import Icon1 from "../../../../../Assets/img/Sprite_Icon_PR_Buff_23.png";
import Icon2 from "../../../../../Assets/img/Sprite_Icon_PR_Buff_23-1.png";
import Icon3 from "../../../../../Assets/img/Sprite_Icon_PR_Buff_23-2.png";
import Icon4 from "../../../../../Assets/img/Sprite_Icon_PR_Buff_23-3.png";

import styles from './styles.module.scss'

export const PremiumBuffItems = () => {
  const icons = [Icon1, Icon2, Icon3, Icon4];

  return (
    <div className={styles.premiumBuffItem}>
      {icons.map((icon) => (
        <img src={icon} alt={icon} />
      ))}
    </div>
  );
};
