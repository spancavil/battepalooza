import React from 'react';
import styles from './styles.module.scss';
import img3 from '../../../../Assets/img/img3.png';

const Content6 = ({desktop, hd, mobile}) => {

/*   useEffect(() => {
    
    const text3 = document.getElementById("text3");
    const imagen = document.getElementById("img3");

    const parallax = () => {
      let scrollY = window.scrollY;
      if (hd) {
        if (scrollY > 2300 && scrollY < 2900){
          imagen.style.top = (scrollY - 2300) * 0.12 + 'px';
          text3.style.top = (scrollY - 2300) * 0.25 + 'px';  
        } 
      } else if (desktop) {
        if (scrollY > 2100 && scrollY < 2900){
          imagen.style.top = (scrollY - 2300) * 0.15 + 'px';
          text3.style.top = (scrollY - 2150) * 0.32 + 'px';
        } else return;
      } else if (mobile) {
        if (scrollY > 2300 && scrollY < 4100){
          imagen.style.top = (scrollY - 1600) * 0.06 - 80 + 'px';
          text3.style.top = (scrollY - 1600) * 0.08 - 100 + 'px';
        }
      } else {
        if (scrollY > 2800 && scrollY < 4100){
          imagen.style.top = (scrollY - 1600) * 0.05 - 80 + 'px';
          text3.style.top = (scrollY - 1600) * 0.06 - 80 + 'px';
        }
      }
    }

    window.addEventListener('scroll', parallax)

    return () => {
      window.removeEventListener('scroll', parallax);
    }
  }, [desktop, hd, mobile]); */

  return (
    <div className={styles.content6}>
      <article className={styles.article}>
        <section className={styles.section}>
          <div className={styles.box2} id = "img3">
            <img src={img3} alt="BattlePalooza" />
          </div>
          <div className={styles.box2} id = "text3">
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
