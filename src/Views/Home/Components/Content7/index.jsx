import React from 'react';
import styles from './styles.module.scss';
import img4 from '../../../../Assets/img/img4.png';

const Content7 = () => {
  return (
    <div className={styles.content6}>
      <article className={styles.article}>
        <section className={styles.section}>
          <div>
            <h3>A GAME OF STRATEGY NOT JUST SKILLS</h3>
            <p>
              Decide on your unique loadout that best fits your strategy at the start of each match. Upgrade weapons and skills throughout the match by collecting items. The strategic gameplay is in knowing what to equip and upgrade by understanding your play style and the match situation. Victory will be determined by the right strategy.
            </p>
          </div>
          <div>
            <img src={img4} alt="BattlePalooza" />
          </div>
        </section>
      </article>
    </div>
  );
};

export default Content7;
