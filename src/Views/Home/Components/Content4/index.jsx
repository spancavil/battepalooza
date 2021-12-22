import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import img1 from '../../../../Assets/img/img1.png';

const Content4 = ({desktop, hd, mobile}) => {

  useEffect(() => {
   
    const text1 = document.getElementById("text1");
    const imagen = document.getElementById("img1");

    const parallax = () => {
      let scrollY = window.scrollY;
      if (hd) {
        if (scrollY > 1200 && scrollY < 1800){
          imagen.style.top = (scrollY - 1100) * 0.06 + 'px';
          text1.style.top = (scrollY - 1300) * 0.25 + 'px';  
        } 
      } else if (desktop) {
        if (scrollY > 1000 && scrollY < 1800){
          imagen.style.top = (scrollY - 1000) * 0.08 + 'px';
          text1.style.top = (scrollY - 1100) * 0.32 + 'px';
        }
      } else if (mobile) {
        if (scrollY > 900 && scrollY < 2000){
          imagen.style.top = (scrollY - 1000) * 0.06 - 30 + 'px';
          text1.style.top = (scrollY - 1100) * 0.06 - 10 + 'px';
        }
      } else {
        if (scrollY > 950 && scrollY < 2000){
          imagen.style.top = (scrollY - 1000) * 0.06 - 30 + 'px';
          text1.style.top = (scrollY - 1100) * 0.1 - 20 + 'px';
        }
      }
    }

    window.addEventListener('scroll', parallax)

    return () => {
      window.removeEventListener('scroll', parallax);
    }
  }, [desktop, hd, mobile])

  return (
    <div className={styles.content4}>
      <article className={styles.article}>
        <section className={styles.container}>
          <div className={styles.box} id = "img1">
            <img
              src={img1}
              alt='BattlePalooza'
              data-pagespeed-url-hash="626340491"
            />
          </div>
          <div className={styles.box2} id = "text1" style={{top: hd ? '-18px': desktop ? '-28px': null}} >
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
