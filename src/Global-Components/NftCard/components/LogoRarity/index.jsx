import LegendaryIcon from "../../../../Assets/img/LegendaryIcon.png";
import CommonIcon from "../../../../Assets/img/CommonIcon.png";
import RareIcon from "../../../../Assets/img/RareIcon.png";
import EpicIcon from "../../../../Assets/img/EpicIcon.png";
import styles from "./styles.module.scss";

const LogoRarity = ({ rarity }) => {
  const rarities = {
    ["Common" || 1]: {
      color: "#EBEBEB",
      name: "Common",
      img: CommonIcon,
    },
    ["Rare" || 2]: {
      color: "#54F952",
      name: "Rare",
      img: RareIcon,
    },
    ["Epic" || 3]: {
      color: "#3C92E7",
      name: "Epic",
      img: EpicIcon,
    },
    ["Legendary" || 4]: {
      color: "#B922E3",
      name: "Legendary",
      img: LegendaryIcon,
    },
  };

  return (
    <div className={styles[`rarity${rarities[rarity]?.name}`]}>
      <img
        className={styles.imagen}
        src={rarities[rarity]?.img}
        alt={rarities[rarity]?.name}
      />
    </div>
  );
};

export default LogoRarity;
