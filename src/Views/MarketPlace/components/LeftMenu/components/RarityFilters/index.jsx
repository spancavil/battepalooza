import CommonIcon from "../../../../../../Assets/img/CommonIcon.png";
import RareIcon from "../../../../../../Assets/img/RareIcon.png";
import EpicIcon from "../../../../../../Assets/img/EpicIcon.png";
import LegendaryIcon from "../../../../../../Assets/img/LegendaryIcon.png";

import styles from "./styles.module.scss";

const RarityFilters = ({ onChange, filters }) => {
  const rarityFilters = [
    {
      img: CommonIcon,
      text: "Common",
      name: "COMMON",
    },
    {
      img: RareIcon,
      text: "Rare",
      name: "RARE",
    },
    {
      img: EpicIcon,
      text: "Epic",
      name: "EPIC",
    },
    {
      img: LegendaryIcon,
      text: "Legendary",
      name: "LEGENDARY",
    },
  ];

  return (
    <div className={styles.filters}>
      {rarityFilters.map(({ img, text, name }) => (
        <div
          onClick={() => onChange(name)}
          className={filters[name] ? styles.filterActive : styles.filter}
        >
          <img src={img} alt={name} />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
};

export default RarityFilters;
