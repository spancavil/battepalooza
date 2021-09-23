import React from 'react';
import styles from './styles.module.scss';
import img3 from '../../../../Assets/img/img3.png';

const Content6 = () => {
  return (
    <div className={styles.content6}>
      <article className={styles.article}>
        <section className={styles.section}>
          <div className={styles.box2}>
            <img src={img3} alt="BattlePalooza" />
          </div>
          <div className={styles.box2}>
            <h3>Play with Your Friends</h3>
            <p>
              Invite your friends for a little downtown showdown in this fun social game. Or form an alliance to strategize and work together to gang up on your opponents.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Content6;
