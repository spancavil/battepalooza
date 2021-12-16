import React, {useEffect} from 'react';
import styles from './styles.module.scss';

const AboutCoins = ({desktop, hd}) => {
  useEffect(() => {
   
    const about = document.getElementById("about");
    const fondo = document.getElementById("content2");

    const parallax = () => {
      let scrollY = window.scrollY;
      if (hd) {
        if (scrollY > 300 && scrollY < 1000){
          fondo.style.left = (scrollY - 750) * 0.030 - 5 + 'px';
          about.style.right = (scrollY - 750) * 0.030 + 14 + 'px';

          about.style.top = (scrollY - 400) * 0.10 + 10 + 'px';  
        } 
      } else if (desktop) {
        if (scrollY > 300 && scrollY < 700){
          fondo.style.left = (scrollY - 750) * 0.04 - 10.5 + 'px';
          about.style.right = (scrollY - 750) * 0.04 + 18 + 'px';

          about.style.top = (scrollY - 400) * 0.05 + 'px';  
        } 
      }
      console.log(scrollY);
    }

    window.addEventListener('scroll', parallax)

    return () => {
      window.removeEventListener('scroll', parallax);
      console.log("No más parallax");
    }
  }, [desktop, hd])

  return (
    <div className={styles.content2} id = "content2">
      <article id = "about">
        <h2> Earn more <br /> with Battlepalooza<b>!</b></h2>
        <h4>Trade in <b>NCoins</b> for incredible prizes</h4>
        <p>
          The more you play, the more NCoins you
          earn! <br /> NCoins are also available for purchase
        </p>
      </article>
    </div>
  );
};

export default AboutCoins;
