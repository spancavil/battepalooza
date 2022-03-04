import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import SocialMedia from "./Components/SocialMedia";
import AboutCoins from "./Components/AboutCoins";
import Content3 from "./Components/Content3";
import Content4 from "./Components/Content4";
import Content5 from "./Components/Content5";
import Content6 from "./Components/Content6";
import Content7 from "./Components/Content7";
import Content8 from "./Components/Content8";
import { sendAmplitudeData } from "../../Utils/amplitude";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import Footer from "./Components/Footer";
import Main from "./Components/Main";

const HomeContainer = () => {
  // const [ytDisplay, setYtDisplay] = useState(false);
  const mobile = useMediaQuery("(max-width: 766px)");
  const desktop = useMediaQuery("(min-width: 1200px) and (max-width: 1399px)");
  const hd = useMediaQuery("(min-width: 1400px)");

  /* const handleWatchTrailer = () => {
    setYtDisplay(!ytDisplay);
  }; */

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
      <Main />
      <AboutCoins hd={hd} desktop={desktop} />
      <Content3 hd={hd} desktop={desktop} mobile={mobile} />
      <Content4 hd={hd} desktop={desktop} mobile={mobile} />
      <Content5 hd={hd} desktop={desktop} mobile={mobile} />
      <Content6 hd={hd} desktop={desktop} mobile={mobile} />
      <Content7 hd={hd} desktop={desktop} mobile={mobile} />
      <Content8 hd={hd} desktop={desktop} mobile={mobile} />
      <Footer />
      <SocialMedia />
    </div>
  );
};

export default HomeContainer;
