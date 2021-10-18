import React, {useContext, useState} from 'react';
import styles from './styles.module.scss';
import {NftData} from '../../../../Context/NftProvider';
import {useMediaQuery} from '../../../../Hooks/useMediaQuery';
import ScrollBar from '../../../../Global-Components/ScrollBar';
import {Link} from 'react-router-dom';

const CollectionNfts = ({flex, short}) => {
  const [scroll, setScroll] = useState ({scrollLeft: '', scrollWidth: ''});
  const queryTablet = useMediaQuery ('(max-width: 766px)');
  const {nfts} = useContext (NftData);

  const handleScroll = e => {
    setScroll ({
      scrollLeft: e.target.scrollLeft,
      scrollWidth: e.target.scrollWidth - e.target.offsetWidth,
    });
  };

  const nftsShort = nfts.slice (0, 3);

  return (
    <div className={styles.cardsContainer}>
      <div
        className={flex === '1' ? styles.cardsGrid : styles.cards}
        onScroll={handleScroll}
      >
        {short
          ? nftsShort.map (nft => {
              return (
                <Link
                  style={{textDecoration: 'none'}}
                  to={`/register-to-marketplace/${nft.id}`}
                >
                  <div className={styles.cardNft} key={nft.id}>
                    <img className={styles.imgNft} src={nft.imgSrc} alt="nft" />
                    <div className={styles.texts}>
                      <p>Series 1 </p>
                      <p className={styles.text2}>Tron Warrior</p>
                    </div>
                  </div>
                </Link>
              );
            })
          : nfts.map (nft => {
              return (
                <Link
                  style={{textDecoration: 'none'}}
                  to={`/register-to-marketplace/${nft.id}`}
                >
                  <div className={styles.cardNft} key={nft.id}>
                    <img className={styles.imgNft} src={nft.imgSrc} alt="nft" />
                    <div className={styles.texts}>
                      <p>Series 1 </p>
                      <p className={styles.text2}>Tron Warrior</p>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
      {queryTablet &&
        <ScrollBar
          width={scroll.scrollWidth}
          position={scroll.scrollLeft}
          elements={short ? nftsShort.length : nfts.length}
        />}
    </div>
  );
};

export default CollectionNfts;
