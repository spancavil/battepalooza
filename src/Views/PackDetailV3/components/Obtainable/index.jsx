import Loader from "../../../../Global-Components/Loader";
import { ObtainableNft } from "./components/ObtainableNft";
import { PremiumBuffItems } from "./components/PremiumBuffItem";
import { RarityItem } from "./components/RarityItem";

import styles from "./styles.module.scss";

const Obtainable = ({ nftList, premiumBuffs, rarityRates }) => {
  const getPercentages = () => {
    const rarities = rarityRates && Object.values(rarityRates);

    if (rarities?.length > 0) {
      const total = rarities?.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      );

      const percentages = rarities.map((item, i) => {
        return {
          percentage: Math.round((item / total) * 100),
        };
      });

      return percentages;
    }
  };

  const percentages = getPercentages();

  return (
    <div className={styles.obtainableContainer}>
      <div className={styles.left}>
        {percentages?.length > 0 ? (
          <div className={styles.box}>
            <h4>Rarity Rate</h4>
            <div className={styles.rarityItems}>
              {percentages?.map(({ percentage }, i) => (
                <RarityItem key={i} percentage={percentage} rarity={i + 1} />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.boxLoading}>
            <Loader />
          </div>
        )}
        {premiumBuffs?.length > 0 ? (
          <div className={styles.box}>
            <h4>Obtainable Premium Buffs</h4>
            <div className={styles.premiumBuffItems}>
              {premiumBuffs?.map((item) => (
                <PremiumBuffItems key={item?.id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.boxLoading}>
            <Loader />
          </div>
        )}
      </div>
      {nftList?.length > 0 ? (
        <div className={styles.rigth}>
          <h4>Obtainable NFTs</h4>
          <div className={styles.nftList}>
            {nftList?.map((item) => (
              <ObtainableNft key={item?.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.rigthLoading}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Obtainable;
