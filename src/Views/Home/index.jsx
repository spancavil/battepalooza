import React, { useEffect } from "react";
import { ComponentsHome } from "./Components";

import { sendAmplitudeData } from "../../Utils/amplitude";
import { useMediaQuery } from "../../Hooks/useMediaQuery";

import styles from "./styles.module.scss";
import Footer from "./Components/Footer";

const HomeContainer = () => {
  const mobile = useMediaQuery("(max-width: 766px)");
  const desktop = useMediaQuery("(min-width: 1200px) and (max-width: 1399px)");
  const hd = useMediaQuery("(min-width: 1400px)");

  useEffect(() => {
    sendAmplitudeData("Main page visit");
  }, []);

  //Desplazamiento en parallax de la imagen de fondo.
  useEffect(() => {
    const imagen = document.getElementById("homeImage");

    const parallax = () => {
      let scrollY = window.scrollY;
      if (desktop || hd) {
        imagen.style.bottom = -scrollY * 0.6 + "px";
      } else {
        imagen.style.top = scrollY * 0.3 + "px";
      }
    };

    window.addEventListener("scroll", parallax);

    return () => {
      window.removeEventListener("scroll", parallax);
    };
  }, [mobile, desktop, hd]);

  return (
    <div className={styles.container}>
      <ComponentsHome.Main />
      <ComponentsHome.AboutCoins />
      {/* <ComponentsHome.Carrousel /> */}
      {/* <ComponentsHome.Tokenomics /> */}
      <ComponentsHome.Content3 hd={hd} desktop={desktop} mobile={mobile} />
      {/* <ComponentsHome.RoadMap /> */}
      <ComponentsHome.Content4 hd={hd} desktop={desktop} mobile={mobile} />
      <ComponentsHome.Content5 hd={hd} desktop={desktop} mobile={mobile} />
      <ComponentsHome.Content6 hd={hd} desktop={desktop} mobile={mobile} />
      <ComponentsHome.Content7 hd={hd} desktop={desktop} mobile={mobile} />
      <ComponentsHome.Content8 hd={hd} desktop={desktop} mobile={mobile} />
      <Footer />
      <ComponentsHome.SocialMedia />
    </div>
  );
};

export default HomeContainer;
