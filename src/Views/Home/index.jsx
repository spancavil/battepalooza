import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import bpBrand from "../../Assets/img/BI-BP-2.png";
import Home from "../../Assets/img/Bg-Home.png";
import SocialMedia from "./Components/SocialMedia";
import Button from "../../Global-Components/Button";
import AboutCoins from "./Components/AboutCoins";
import Content3 from "./Components/Content3";
import Content4 from "./Components/Content4";
import Content5 from "./Components/Content5";
import Content6 from "./Components/Content6";
import Content7 from "./Components/Content7";
import Content8 from "./Components/Content8";
import YoutubeEmbed from "./Components/Youtube";
import { sendAmplitudeData } from "../../Utils/amplitude";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import Footer from "./Components/Footer";

const HomeContainer = () => {
  const [ytDisplay, setYtDisplay] = useState(false);
  const mobile = useMediaQuery("(max-width: 766px)");
  const desktop = useMediaQuery("(min-width: 1200px) and (max-width: 1399px)");
  const hd = useMediaQuery("(min-width: 1400px)");

  const handleWatchTrailer = () => {
    setYtDisplay(!ytDisplay);
  };

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
      <div className={styles.content1}>
        <div className={styles.battle}>
          <img
            src={Home}
            alt="home"
            className={styles.homePic}
            id="homeImage"
          />
          <img src={bpBrand} alt="bp-brand" className={styles.bpBrand} />
          <div className={styles.botones}>
            <Button
              main={true}
              title="Watch trailer"
              onClick={() => handleWatchTrailer()}
            />
            {ytDisplay && (
              <YoutubeEmbed
                embedId={"fMevuQyBLjE"}
                onExit={() => handleWatchTrailer()}
              />
            )}
            <a
              rel="noreferrer"
              target="_blank"
              className={styles.newButton}
              href="https://apps.apple.com/app/battlepalooza-battle-royale/id1536697211"
            >
              <button>
                <svg
                  width="30"
                  height="30"
                  x="0"
                  y="0"
                  viewBox="0 0 553.048 553.048"
                >
                  <g>
                    <g xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path
                          d="M76.774,179.141c-9.529,0-17.614,3.323-24.26,9.969c-6.646,6.646-9.97,14.621-9.97,23.929v142.914    c0,9.541,3.323,17.619,9.97,24.266c6.646,6.646,14.731,9.97,24.26,9.97c9.522,0,17.558-3.323,24.101-9.97    c6.53-6.646,9.804-14.725,9.804-24.266V213.039c0-9.309-3.323-17.283-9.97-23.929C94.062,182.464,86.082,179.141,76.774,179.141z"
                          fill="#ffffff"
                          data-original="#000000"
                        />
                        <path
                          d="M351.972,50.847L375.57,7.315c1.549-2.882,0.998-5.092-1.658-6.646c-2.883-1.34-5.098-0.661-6.646,1.989l-23.928,43.88    c-21.055-9.309-43.324-13.972-66.807-13.972c-23.488,0-45.759,4.664-66.806,13.972l-23.929-43.88    c-1.555-2.65-3.77-3.323-6.646-1.989c-2.662,1.561-3.213,3.764-1.658,6.646l23.599,43.532    c-23.929,12.203-42.987,29.198-57.167,51.022c-14.18,21.836-21.273,45.698-21.273,71.628h307.426    c0-25.924-7.094-49.787-21.273-71.628C394.623,80.045,375.675,63.05,351.972,50.847z M215.539,114.165    c-2.552,2.558-5.6,3.831-9.143,3.831c-3.55,0-6.536-1.273-8.972-3.831c-2.436-2.546-3.654-5.582-3.654-9.137    c0-3.543,1.218-6.585,3.654-9.137c2.436-2.546,5.429-3.819,8.972-3.819s6.591,1.273,9.143,3.819    c2.546,2.558,3.825,5.594,3.825,9.137C219.357,108.577,218.079,111.619,215.539,114.165z M355.625,114.165    c-2.441,2.558-5.434,3.831-8.971,3.831c-3.551,0-6.598-1.273-9.145-3.831c-2.551-2.546-3.824-5.582-3.824-9.137    c0-3.543,1.273-6.585,3.824-9.137c2.547-2.546,5.594-3.819,9.145-3.819c3.543,0,6.529,1.273,8.971,3.819    c2.438,2.558,3.654,5.594,3.654,9.137C359.279,108.577,358.062,111.619,355.625,114.165z"
                          fill="#ffffff"
                          data-original="#000000"
                        />
                        <path
                          d="M123.971,406.804c0,10.202,3.543,18.838,10.63,25.925c7.093,7.087,15.729,10.63,25.924,10.63h24.596l0.337,75.454    c0,9.528,3.323,17.619,9.969,24.266s14.627,9.97,23.929,9.97c9.523,0,17.613-3.323,24.26-9.97s9.97-14.737,9.97-24.266v-75.447    h45.864v75.447c0,9.528,3.322,17.619,9.969,24.266s14.73,9.97,24.26,9.97c9.523,0,17.613-3.323,24.26-9.97    s9.969-14.737,9.969-24.266v-75.447h24.928c9.969,0,18.494-3.544,25.594-10.631c7.086-7.087,10.631-15.723,10.631-25.924V185.45    H123.971V406.804z"
                          fill="#ffffff"
                          data-original="#000000"
                        />
                        <path
                          d="M476.275,179.141c-9.309,0-17.283,3.274-23.93,9.804c-6.646,6.542-9.969,14.578-9.969,24.094v142.914    c0,9.541,3.322,17.619,9.969,24.266s14.627,9.97,23.93,9.97c9.523,0,17.613-3.323,24.26-9.97s9.969-14.725,9.969-24.266V213.039    c0-9.517-3.322-17.552-9.969-24.094C493.888,182.415,485.798,179.141,476.275,179.141z"
                          fill="#ffffff"
                          data-original="#000000"
                        />
                      </g>
                    </g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                  </g>
                </svg>
                <p>Android</p>
              </button>
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              className={styles.newButton}
              href="https://play.google.com/store/apps/details?id=com.nway.battlepalooza"
            >
              <button className={styles.newButton}>
                <svg
                  width="30"
                  height="30"
                  x="0"
                  y="0"
                  viewBox="0 0 512.003 512.003"
                >
                  <g>
                    <script />
                    <g xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path
                          d="M351.98,0c-27.296,1.888-59.2,19.36-77.792,42.112c-16.96,20.64-30.912,51.296-25.472,81.088    c29.824,0.928,60.64-16.96,78.496-40.096C343.916,61.568,356.556,31.104,351.98,0z"
                          fill="#ffffff"
                          data-original="#000000"
                        />
                      </g>
                    </g>
                    <g xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path
                          d="M459.852,171.776c-26.208-32.864-63.04-51.936-97.824-51.936c-45.92,0-65.344,21.984-97.248,21.984    c-32.896,0-57.888-21.92-97.6-21.92c-39.008,0-80.544,23.84-106.88,64.608c-37.024,57.408-30.688,165.344,29.312,257.28    c21.472,32.896,50.144,69.888,87.648,70.208c33.376,0.32,42.784-21.408,88-21.632c45.216-0.256,53.792,21.92,87.104,21.568    c37.536-0.288,67.776-41.28,89.248-74.176c15.392-23.584,21.12-35.456,33.056-62.08    C387.852,342.624,373.932,219.168,459.852,171.776z"
                          fill="#ffffff"
                          data-original="#000000"
                        />
                      </g>
                    </g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                  </g>
                </svg>
                <p>IOS</p>
              </button>
            </a>
          </div>
        </div>
      </div>

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
