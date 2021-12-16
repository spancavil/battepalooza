import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import img2 from '../../../../Assets/img/img2.jpg';

const Content5 = ({hd, desktop}) => {

  useEffect(() => {
   
    const text2 = document.getElementById("text2");
    const imagen = document.getElementById("img2");

    const parallax = () => {
      let scrollY = window.scrollY;
      if (hd) {
        if (scrollY > 1800 && scrollY < 2300){
          imagen.style.top = (scrollY - 1900) * 0.03 + 'px';
          text2.style.top = (scrollY - 2000) * 0.20 + 'px';  
        } 
      } else if (desktop) {
        if (scrollY > 1500 && scrollY < 2100){
          imagen.style.top = (scrollY - 1600) * 0.04 + 'px';
          text2.style.top = (scrollY - 1700) * 0.18 + 'px';
        } else return;
        console.log(scrollY);
      }
    }

    window.addEventListener('scroll', parallax)

    return () => {
      window.removeEventListener('scroll', parallax);
      console.log("No más parallax");
    }
  }, [desktop, hd])

  return (
    <div className={styles.content5}>
      <article className={styles.article}>
        <section className={styles.section}>
          <div className={styles.box} id = "text2">
            <h3>WIN VALUABLE COINS & EXCLUSIVE GEARS</h3>
            <p>
              Every player has a chance to win coins and gears on every game. Last contestant standing wins valuable premium coins that can be traded for exclusive gears and skins. Stake your premium coins on Premium Matches to win big. New, exclusive and limited edition gears are offered weekly for you to collect.
            </p>
          </div>
          <div className={styles.box} id = "img2">
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
