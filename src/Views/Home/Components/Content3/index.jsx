import React from 'react';
import styles from './styles.module.scss';
import arrow from '../../../../Assets/img/arrow.png';

const Content3 = () => {
  return (
    <div className={styles.content3}>
      <div className={styles.container}>
        <h3>A Digital Game Show in the Form of a Battle Royale</h3>
        <p>
          Compete in real-time against live contestants from around the world for real-world prizes in a 24-player battle royale. Grab as many coins as you can in the arena without getting fragged. Survive until the end to take home the big loot!
        </p>
        <img
          src={arrow}
          alt="arrow"
          data-pagespeed-url-hash="601268972"
        />
      </div>
    </div>
  );
};

export default Content3;
