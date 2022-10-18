import LogoRarity from "./components/LogoRarity";
import { useEffect, useContext, useState } from "react";
import { separator } from "../../Utils/separator";
import styles from "./styles.module.scss";
import { NftData } from "../../Context/NftProvider";

const NftCard = ({ nft, tilt, onClick, withPrice, withChance }) => {
  const {premiumStatic} = useContext(NftData)
  const [buffs, setBuffs] = useState([])

  const BP_BASE_URL = process.env.REACT_APP_API_BATTLEPALOOZA;

  //Set buff list
  useEffect(() => {
      const buffs = [];
      if (nft.buff) {
          for (const buffItem of nft.buff) {
              const buffFinded = premiumStatic?.find(buff => buff.id === buffItem.id);
              if (buffFinded) buffFinded.value = buffItem.value;
              buffs.push(buffFinded);
          }
          setBuffs(buffs)
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
      >
          {/* <h3>{nft?.itemName}</h3> */}
          <div className={styles.characterFrame}>
            <div className={styles.rarityIcon}>
                <LogoRarity rarity={nft?.rarity} />
            </div>
            <img
                className={styles.imgNft}
                src={nft.thumbnailUrl}
                alt="nft-thumb"
            />
            <div className={styles.buffs}>
              {buffs.map((buff, idx) => {
                return <img src={BP_BASE_URL + buff.icon} alt="buff-icon" key={idx}/>
              })}
            </div>
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
