import React, {useContext, useState} from 'react';
import styles from './styles.module.scss';
import {CardData} from '../../../../Context/CardDataProvider';
import {useMediaQuery} from '../../../../Hooks/useMediaQuery';
import ScrollBar from '../../../../Global-Components/ScrollBar';

const CollectionPacks = () => {
  const [scroll, setScroll] = useState ({scrollLeft: '', scrollWidth: ''});
  const queryTablet = useMediaQuery ('(max-width: 766px)');
  const {packs} = useContext (CardData);

  const handleScroll = e => {
    setScroll ({
      scrollLeft: e.target.scrollLeft,
      scrollWidth: e.target.scrollWidth - e.target.offsetWidth,
    });
  };

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cards} onScroll={handleScroll}>
        {packs.map (pack => {
          return (
            <div className={styles.card} key={pack.id}>
              <img src={pack.imgSrc} alt={pack.imgSrc} />
              <div className={styles.texts}>
                <p className={styles.text1}>{pack.description.text1} </p>
                <p className={styles.text2}>{pack.description.text2}</p>
                <p className={styles.text3}>{pack.description.text3} </p>
              </div>
            </div>
          );
        })}
      </div>
      {queryTablet &&
        <ScrollBar
          width={scroll.scrollWidth}
          position={scroll.scrollLeft}
          elements={packs.length}
        />}
    </div>
  );
};

export default CollectionPacks;
