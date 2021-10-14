import React from 'react';
import {Link} from 'react-router-dom';
import Background from '../../Global-Components/Background';
import Button from '../../Global-Components/Button';
import styles from './styles.module.scss';
import CollectionPacks from './Components/CollectionPacks';
import CollectionNfts from './Components/CollectionNfts';

const Collection = () => {
  return (
    <Background>
      <div className={styles.container}>
        <div className={styles.content}>
          <p>PACK</p>
          <div className={styles.rectangle}>
            <CollectionPacks short />
            <div className={styles.link}>
              <Link to="/collection/packs">
                <Button title="FULL LIST" />
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.content2}>
          <p className={styles.title}>NFT</p>
          <div className={styles.rectangle}>
            <CollectionNfts />
            <div className={styles.link}>
              <Link to="/collection/nft">
                <Button title="FULL LIST" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Collection;
