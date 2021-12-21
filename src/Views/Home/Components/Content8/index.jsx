import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import img5 from '../../../../Assets/img/img5.png';

const Content8 = ({desktop, hd, mobile}) => {

  useEffect(() => {
   
    const text5 = document.getElementById("text5");
    const imagen = document.getElementById("img5");

    const parallax = () => {
      let scrollY = window.scrollY;
      if (hd) {
        if (scrollY > 3000 && scrollY < 3900){
          imagen.style.top = (scrollY - 3600) * 0.12 + 'px';
          text5.style.top = (scrollY - 3200) * 0.25 + 'px';  
        } 
      } else if (desktop) {
        if (scrollY > 2900 && scrollY < 3600){
          imagen.style.top = (scrollY - 3300) * 0.15 + 'px';
          text5.style.top = (scrollY - 3100) * 0.32 + 'px';
        } else return;
      } else if (mobile) {
        if (scrollY > 3700 && scrollY < 5000){
          imagen.style.top = (scrollY - 2900) * 0.06 - 100 + 'px';
          text5.style.top = (scrollY - 2900) * 0.08 - 100 + 'px';
        }
      } else {
        if (scrollY > 4700){
          imagen.style.top = (scrollY - 1600) * 0.04 - 200 + 'px';
          text5.style.top = (scrollY - 1600) * 0.06 - 200 + 'px';
        }
      }
    }

    window.addEventListener('scroll', parallax)

    return () => {
      window.removeEventListener('scroll', parallax);
    }
  }, [desktop, hd, mobile])

  return (
    <div className={styles.content8}>
      <article>
        <section>
          <div
          id = "img5"
          >
            <img
            src={img5}
            alt="BattlePalooza"
            />
          </div>
          <div
          id = "text5"
          >
            <h3>Out-of-this-World Fun for Everyone </h3>
            <p>
              Battlepalooza is designed for players of all skill levels. You don't have a to be a hardcore gamer to stand a chance. The game features a top down view for easier navigation. The combat system rewards players with a blend of strategy, skill and luck -- and not just reaction time.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Content8;
