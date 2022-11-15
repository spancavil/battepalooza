import LogoRarity from "./components/LogoRarity";
import { useEffect, useContext, useState } from "react";
import { separator } from "../../Utils/separator";
import styles from "./styles.module.scss";
import { NftData } from "../../Context/NftProvider";
import SemiFrame from "./components/SemiFrame";
import iconP2e from "../../Assets/img/Sprite_Icon_Gamemode_04.png";
import ncoinIcon from "../../Assets/img/Sprite_Icon_Reward_35.png";

const NftCard = ({
  nft,
  tilt,
  onClick,
  withPrice,
  withChance,
  additionalStyles = null,
  hoverOnBuff = () => {},
}) => {
  const { premiumStatic } = useContext(NftData);
  const [buffs, setBuffs] = useState([]);

  //Set buff list
  useEffect(() => {
    const buffs = [];
    if (nft.buff) {
      for (const buffItem of nft.buff) {
        const buffFinded = premiumStatic?.find(
          (buff) => buff.id === buffItem.id
        );
        if (buffFinded) buffFinded.value = buffItem.value;
        buffs.push(buffFinded);
      }
      setBuffs(buffs);
    }
  }, [nft, premiumStatic]);

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
      ref={tilt && tilt}
      onClick={onClick && (() => onClick())}
      className={setRarityCard(nft?.rarity)}
      style={{ ...additionalStyles }}
    >
      {typeof nft?.salesState === "number" && nft.salesState === 1 && (
        <p className={styles.onSale}>ON SALE</p>
      )}
      <div className={styles.characterFrame}>
        <SemiFrame rarity={nft?.rarity} />
        <div className={styles.rarityIcon}>
          <LogoRarity rarity={nft?.rarity} />
        </div>
        <img className={styles.imgNft} src={nft.thumbnailUrl} alt="nft-thumb" />
        <div
          className={styles.buffs}
          onMouseEnter={() => {
            hoverOnBuff(buffs);
          }}
        >
          {buffs.map((buff, idx) => {
            return <img src={buff?.icon} alt="buff-icon" key={idx} />;
          })}
        </div>
      </div>
      <div className={styles.texts}>
        <p className={styles.title}>{nft.itemName}</p>
        <p className={styles.subtitle}>{nft.repName}</p>
        {nft?.sellerName ? (
          <p className={styles.seller}>Seller: {nft.sellerName}</p>
        ) : null}

        <div className={styles.p2eContainer}>
          <img src={iconP2e} className={styles.p2eIcon} alt="p2E-icon" />
          <p className={styles.p2e}>
            Left times to P2E:{" "}
            {Number(nft.maxPlayCount) - Number(nft.playCount)}
          </p>
        </div>
        {nft?.price && (
          <div className={styles.nCoinContainer}>
            <img src={ncoinIcon} className={styles.p2eIcon} alt="p2E-icon" />
            <p className={styles.title}>{separator(nft.price)} NCoin</p>
          </div>
        )}
        {/* {withPrice && <span>{separator(nft?.price)} nCoin</span>} */}
        {withChance && (
          <p className={styles.chance}>
            Chance <b>50%</b>
          </p>
        )}
      </div>
    </div>
  );
};

export default NftCard;
