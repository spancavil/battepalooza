import React from 'react';
import Background from '../../Global-Components/Background';
import Button from '../../Global-Components/Button';
import styles from './styles.module.scss';
import img from '../../Assets/sprites/cardpack01.png';

const OpenPack = () => {
  return (
    <Background>
      <div className={styles.container}>
        <div className={styles.deg}>
          <div className={styles.card}>
            <img src={img} alt="pack" />
            <div className={styles.down}>
              <Button title='OPEN' />
              <p>OPEN LATER</p>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default OpenPack;
