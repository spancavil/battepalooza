import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import img5 from '../../../../Assets/img/img5.png';

const Content8 = () => {
  useEffect(() => {
    
    const text5 = document.getElementById("text5");
    const imagen = document.getElementById("img5");

    const parallax = () => {
      let scrollY = window.scrollY;
      if (scrollY > 3208){
        imagen.style.top = (scrollY - 3508) * 0.15 + 'px';
        text5.style.top = (scrollY - 3390) * 0.30 + 'px';
        console.log(scrollY);
      }
    }

    window.addEventListener('scroll', parallax)

    return () => {
      window.removeEventListener('scroll', parallax);
      console.log("No más parallax");
    }
  }, [])

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
              Battlepalooza is designed for players of all skill levels. You don’t have a to be a hardcore gamer to stand a chance. The game features a top down view for easier navigation. The combat system rewards players with a blend of strategy, skill and luck -- and not just reaction time.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Content8;
