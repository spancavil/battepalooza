import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import arrow from '../../../../Assets/img/arrow.png';
import bgSection from '../../../../Assets/img/bg-section01.jpg'

const Content3 = ({hd, desktop}) => {

    //Desplazamiento en parallax de la imagen de fondo.
    useEffect(() => {
   
      const imagen = document.getElementById("bgSection");
  
      const parallax = () => {
        let scrollY = window.scrollY;
        if (hd) {
          if (scrollY > 700 && scrollY < 1800){
            imagen.style.top = (scrollY) * 0.35 - 430 + 'px';
          }
        }
        if (desktop) {
          if (scrollY > 500 && scrollY < 1100){
            imagen.style.top = (scrollY) * 0.35 - 280 + 'px';
          }
        }
      }
  
      window.addEventListener('scroll', parallax)
  
      return () => {
        window.removeEventListener('scroll', parallax);
      }
    }, [desktop, hd])

  return (
    <div className={styles.content3}>
      <img src={bgSection} alt="bg-section01" className={styles.bgSection} id="bgSection"/>
      <div className={styles.container} style={{top: '-18px'}}>
        <h3>A Digital Game Show in the Form of a Battle Royale</h3>
        <p>
          Compete in real-time against live contestants from around the world for real-world prizes in a 24-player battle royale. Grab as many coins as you can in the arena without getting fragged. Survive until the end to take home the big loot!
        </p>
        <img
          src={arrow}
          alt="arrow"
          data-pagespeed-url-hash="601268972"
        />
      </div>
    </div>
  );
};

export default Content3;
