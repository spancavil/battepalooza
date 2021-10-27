import React, {useContext, useState} from 'react';
import styles from './styles.module.scss';
import {CardData} from '../../../../Context/CardDataProvider';
import {useMediaQuery} from '../../../../Hooks/useMediaQuery';
import ScrollBar from '../../../../Global-Components/ScrollBar';
import {Link} from 'react-router-dom';
import ModalII from '../../../JoinDrop/components/Modal';
import Button from '../../../../Global-Components/Button';

const CollectionPacks = () => {
  const [scroll, setScroll] = useState ({scrollLeft: '', scrollWidth: ''});
  const [modal, setModal] = useState (false);

  const queryTablet = useMediaQuery ('(max-width: 766px)');
  const queryMobile = useMediaQuery ('(max-width: 575px');

  const {packs} = useContext (CardData);

  const handleScroll = e => {
    setScroll ({
      scrollLeft: e.target.scrollLeft,
      scrollWidth: e.target.scrollWidth - e.target.offsetWidth,
    });
  };

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cardsGrid} onScroll={handleScroll}>
        {packs.map (pack => {
          return (
            <div
              onClick={() => setModal (true)}
              className={styles.card}
              key={pack.id}
            >
              <img src={pack.imgSrc} alt={pack.imgSrc} />
              <div className={styles.texts}>
                <p className={styles.text1}>{pack.description.text1} </p>
                <p className={styles.text2}>{pack.description.text2}</p>
                <p className={styles.text3}>{pack.description.text3} </p>
              </div>
            </div>
          );
        })}
        {modal &&
          <div className={styles.modalContainer}>
            <ModalII title="Open Pack">
              <div className={styles.modalButtons}>
                <Link to="/open-pack">
                  <Button
                    title="Open"
                    width={queryMobile ? '126px' : '176px'}
                  />
                </Link>
                <Button
                  title="Later"
                  onClick={() => setModal (false)}
                  width={queryMobile ? '126px' : '176px'}
                  style={{backgroundColor: '#0149DB'}}
                />
              </div>
            </ModalII>
          </div>}
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
