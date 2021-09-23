import React from 'react';
import styles from './styles.module.scss';
import img5 from '../../../../Assets/img/img5.png';

const Content8 = () => {
  return (
    <div className={styles.content8}>
      <article>
        <section>
          <div>
            <img
              src={img5}
              alt="BattlePalooza"
            />
          </div>
          <div>
            <h3>Out-of-this-World Fun for Everyone </h3>
            <p>
              Battlepalooza is designed for players of all skill levels. You don’t have a to be a hardcore gamer to stand a chance. The game features a top down view for easier navigation. The combat system rewards players with a blend of strategy, skill and luck -- and not just reaction time.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Content8;
