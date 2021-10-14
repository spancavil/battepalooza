import React, {useContext, useState} from 'react';
import styles from './styles.module.scss';
import {NftData} from '../../../../Context/NftProvider';
import { useMediaQuery } from '../../../../Hooks/useMediaQuery';
import ScrollBar from '../../../../Global-Components/ScrollBar';

const CollectionNfts = () => {
  const [scroll, setScroll] = useState ({scrollLeft: '', scrollWidth: ''});
  const queryTablet = useMediaQuery ('(max-width: 766px)');
  const {nfts} = useContext (NftData);

  const handleScroll = e => {
    setScroll ({
      scrollLeft: e.target.scrollLeft,
      scrollWidth: e.target.scrollWidth - e.target.offsetWidth,
    });
  };

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cards} onScroll={handleScroll}>
        {nfts.map (nft => {
          return (
            <div className={styles.cardNft} key={nft.id}>
              <img className={styles.imgNft} src={nft.imgSrc} alt="nft" />
              <div className={styles.texts}>
                <p >Series 1 </p>
                <p className={styles.text2}>Tron Warrior</p>
              </div>
            </div>
          );
        })}
      </div>
      {queryTablet &&
        <ScrollBar
          width={scroll.scrollWidth}
          position={scroll.scrollLeft}
          elements={nfts.length}
        />}
    </div>
  );
};

export default CollectionNfts;
