import React from 'react';
import styles from './styles.module.scss';
import img2 from '../../../../Assets/img/img2.png';

const Content5 = () => {
  return (
    <div className={styles.content5}>
      <article className={styles.article}>
        <section className={styles.section}>
          <div className={styles.box}>
            <h3>WIN VALUABLE COINS & EXCLUSIVE GEARS</h3>
            <p>
              Every player has a chance to win coins and gears on every game. Last contestant standing wins valuable premium coins that can be traded for exclusive gears and skins. Stake your premium coins on Premium Matches to win big. New, exclusive and limited edition gears are offered weekly for you to collect.
            </p>
          </div>
          <div className={styles.box}>
            <img
              src={img2}
              alt='BattlePalooza'
              data-pagespeed-url-hash="920840412"
            />
          </div>
        </section>
      </article>
    </div>
  );
};

export default Content5;
