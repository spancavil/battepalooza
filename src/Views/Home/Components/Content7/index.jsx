import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import img4 from '../../../../Assets/img/img4.png';

const Content7 = ({desktop, hd}) => {
  useEffect (
    () => {
      const text4 = document.getElementById ('text4');
      const imagen = document.getElementById ('img4');

      const parallax = () => {
        let scrollY = window.scrollY;
        if (scrollY > 2600 && scrollY < 3100) {
          if (hd) {
            imagen.style.top = (scrollY - 2800) * 0.06 + 'px';
            text4.style.top = (scrollY - 2600) * 0.27 + 'px';
          } else if (desktop) {
            imagen.style.top = (scrollY - 2800) * 0.15 + 'px';
            text4.style.top = (scrollY - 2700) * 0.32 + 'px';
          } else return;
        }
      };

      window.addEventListener ('scroll', parallax);

      return () => {
        window.removeEventListener ('scroll', parallax);
      };
    },
    [desktop, hd]
  );

  return (
    <div className={styles.content6}>
      <article className={styles.article}>
        <section className={styles.section}>
          <div id="text4">
            <h3>A GAME OF STRATEGY NOT JUST SKILLS</h3>
            <p>
              Decide on your unique loadout that best fits your strategy at the start of each match. Upgrade weapons and skills throughout the match by collecting items. The strategic gameplay is in knowing what to equip and upgrade by understanding your play style and the match situation. Victory will be determined by the right strategy.
            </p>
          </div>
          <div id="img4">
            <img src={img4} alt="BattlePalooza" />
          </div>
        </section>
      </article>
    </div>
  );
};

export default Content7;
