import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {CardData} from '../../Context/CardDataProvider';
import Background from '../../Global-Components/Background';
import Button from '../../Global-Components/Button';
import Card from '../../Global-Components/Card';
import styles from './styles.module.scss';

const Collection = () => {
  const {packs, setPack} = useContext (CardData);

  console.log (packs);

  return (
    <Background>
      <div className={styles.container}>
        <div className={styles.content}>
          <p>PACK</p>
          <div className={styles.rectangle}>
            <div className={styles.cards}>
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
            <Link to='/collection/packs'>
              <Button title="FULL LIST" />
            </Link>
          </div>
        </div>

        <div className={styles.content}>
          <p>NFT</p>
          <div className={styles.rectangle}>
            <div className={styles.cards}>
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
            <Link to='/collection/nft'>
              <Button title="FULL LIST" />
            </Link>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Collection;
