import React, {useState} from 'react';
import styles from './styles.module.scss';
import bpBrand from '../../Assets/img/BI-BP-2.png';
import SocialMedia from './Components/SocialMedia';
import Button from '../../Global-Components/Button';
import AboutCoins from './Components/AboutCoins';
import AboutPacks from './Components/AboutPacks';
import Content3 from './Components/Content3';
import Content4 from './Components/Content4';
import Content5 from './Components/Content5';
import Content6 from './Components/Content6';
import Content7 from './Components/Content7';
import Content8 from './Components/Content8';
import animocaLogo from '../../Assets/img/logo-animoca.png';
import nWayLogo from '../../Assets/img/logo-nway.png';
import bearX from '../../Assets/img/bearx.png';

const HomeContainer = () => {
  const [dropdown, setDropdown] = useState (false);

  return (
    <div className={styles.container}>
      <div className={styles.content1}>
        <div className={styles.battle}>
          <img src={bpBrand} alt="bp-brand" />
          <div className={styles.botones}>
            <Button title="Watch trailer" />
            <div className={styles.downloadContainer}>
              <Button
                width="100%"
                onClick={() => setDropdown (!dropdown)}
                title="Download now"
              />
              {dropdown &&
                <div className={styles.dropdown}>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.nway.battlepalooza"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google Play
                  </a>
                  <a
                    rel="noreferrer"
                    href="https://apps.apple.com/app/battlepalooza-battle-royale/id1536697211"
                    target="_blank"
                  >
                    App Store
                  </a>
                </div>}
            </div>
          </div>

        </div>
      </div>

      <AboutCoins />
      <AboutPacks />
      <Content3 />
      <Content4 />
      <Content5 />
      <Content6 />
      <Content7 />
      <Content8 />
      <footer>
        <article>
          <section>
            <div className={styles.div1}>
              <h2>FOLLOW US ON</h2>
              <div className={styles.social}>
                <a
                  href="https://www.facebook.com/Battlepalooza-112765480597639"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    style={{width: '28px'}}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="facebook-square"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#fff"
                      d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
                    />
                  </svg>
                  <br />
                  Facebook
                </a>
                <a
                  href="https://twitter.com/battlepalooza"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    style={{width: '30px'}}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="twitter"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#fff"
                      d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                    />
                  </svg>
                  <br />
                  Twitter
                </a>
                <a
                  href="https://www.instagram.com/BATTLEPALOOZA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    style={{width: '30px'}}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="instagram"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#fff"
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                    />
                  </svg>
                  <br />
                  Instagram
                </a>
                <a
                  href="https://youtube.com/channel/UCKiNBKlBghKR9a0x-Il8WkA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    style={{width: '38px'}}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="youtube"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="#fff"
                      d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                    />
                  </svg>
                  <br />
                  YouTube
                </a>

              </div>
              <div className={styles.brands}>
                <img
                  src={animocaLogo}
                  alt="Animoca Logo"
                  data-pagespeed-url-hash="3690970617"
                  onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                />
                <img
                  src={nWayLogo}
                  alt="nWay Logo"
                  data-pagespeed-url-hash="3262642918"
                  onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                />
              </div>

              <div className={styles.widget}>
                <div>
                  <div>
                    <p>© 2020 nWay – All Rights Reserved.</p>
                  </div>
                </div>
              </div>
              <div className={styles.menu}>
                <div>
                  <div>
                    <ul>
                      <li>
                        <a
                          href="https://battlepalooza.com/privacy-policy/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                        </a>
                      </li>
                      <li>|</li>
                      <li>
                        <a
                          href="http://battlepalooza.com/terms-of-service/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Terms of Service
                        </a>
                      </li>
                      <li>|</li>
                      <li id="menu-item-42">
                        <a
                          href="https://nway.helpshift.com/a/battlepalooza/?p=web"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Report an In-Game Issue
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <img className={styles.bear} src={bearX} alt="bearX" />
            </div>
          </section>
        </article>
      </footer>
      <SocialMedia />
    </div>
  );
};

export default HomeContainer;
