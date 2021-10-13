import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import Background from '../../Global-Components/Background';
import Button from '../../Global-Components/Button';
import styles from './styles.module.scss';
import CollectionPacks from './Components/CollectionPacks';
import CollectionNfts from './Components/CollectionNfts';
import { useMediaQuery } from '../../Hooks/useMediaQuery';
import ScrollBar from '../../Global-Components/ScrollBar';
import { CardData } from '../../Context/CardDataProvider';

const Collection = () => {

  return (
    <Background>
      <div className={styles.container}>
        <div className={styles.content}>
          <p>PACK</p>
          <div className={styles.rectangle}>
            <div className={styles.cards}>
              <CollectionPacks />
            </div>
            <div className={styles.link}>
            <Link to="/collection/packs">
              <Button title="FULL LIST" />
            </Link>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <p>NFT</p>
          <div className={styles.rectangle}>
            <div className={styles.cards}>
              <CollectionNfts />
            </div>
            <Link to="/collection/nft">
              <Button title="FULL LIST" />
            </Link>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Collection;
