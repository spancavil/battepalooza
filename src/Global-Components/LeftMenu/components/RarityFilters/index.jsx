import CommonIcon from "../../../../Assets/img/CommonIcon.png";
import RareIcon from "../../../../Assets/img/RareIcon.png";
import EpicIcon from "../../../../Assets/img/EpicIcon.png";
import LegendaryIcon from "../../../../Assets/img/LegendaryIcon.png";
import '../../../../'

import styles from "./styles.module.scss";

const RarityFilters = ({ onChange, filters }) => {
  const rarityFilters = [
    {
      img: CommonIcon,
      text: "Common",
    },
    {
      img: RareIcon,
      text: "Rare",
    },
    {
      img: EpicIcon,
      text: "Epic",
    },
    {
      img: LegendaryIcon,
      text: "Legendary",
    },
  ];

  return (
    <div className={styles.filters}>
      {rarityFilters.map(({ img, text }) => (
        <div
          key={text}
          onClick={() => onChange(text)}
          className={filters[text] ? styles.filterActive : styles.filter}
        >
          <img src={img} alt={text} />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
};

export default RarityFilters;
