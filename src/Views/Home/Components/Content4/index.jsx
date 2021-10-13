import React from 'react';
import styles from './styles.module.scss';
import img1 from '../../../../Assets/img/img1.png';

const Content4 = () => {
  return (
    <div className={styles.content4}>
      <article className={styles.article}>
        <section className={styles.container}>
          <div className={styles.box}>
            <img
              src={img1}
              alt='BattlePalooza'
              data-pagespeed-url-hash="626340491"
            />
          </div>
          <div className={styles.box2}>
            <h3>REAL CITY MAPS ARE YOUR BATTLEGROUNDS</h3>
            <p>
              Battlepalooza uses Google Maps geospatial data to create arenas. Compete in real-world cities, including Las Vegas, San Francisco and Paris. Different cities offer different levels of prizes.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Content4;
