import React, {useContext} from 'react';
import Background from '../../Global-Components/Background';
import Button from '../../Global-Components/Button';
import styles from './styles.module.scss';
import img from '../../Assets/sprites/cardpack01.png';
import {CardData} from '../../Context/CardDataProvider';
import {Redirect, useParams} from 'react-router';
import {UserData} from '../../Context/UserProvider';

const OpenPack = () => {
  const {packToOpen} = useContext (CardData);

  return !packToOpen.imgSrc
    ? <Redirect to="/" />
    : <Background>
        <div className={styles.container}>
          <div className={styles.deg}>
            <div className={styles.card}>
              <img src={packToOpen.imgSrc} alt="pack" />
              <div className={styles.down}>
                <Button title="OPEN" />
                <p>OPEN LATER</p>
              </div>
            </div>
          </div>
        </div>
      </Background>;
};

export default OpenPack;
