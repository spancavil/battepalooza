import React from 'react';
import Background from '../../Global-Components/Background';
import SocialMedia from '../Home/Components/SocialMedia';
import styles from './styles.module.scss';

const Packs = () => {
  return (
    <Background>
      <div className={styles.packContainer}>
        <div className={styles.banner}>
          BANNER IMG
        </div>
        <h4>
          SKINS PACKS
        </h4>
        <SocialMedia />
      </div>
    </Background>
  );
};

export default Packs;
