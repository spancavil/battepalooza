import React from 'react';
import styles from './styles.module.scss';

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
              src="http://battlepalooza.com/wp-content/themes/hemingway/assets/images/ximg-03.png.pagespeed.ic.BFBfh58MDk.webp"
              class="screenshot"
              alt=""
              data-pagespeed-url-hash="920840412"
              onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
            />
          </div>
        </section>
      </article>
    </div>
  );
};

export default Content5;
