import animocaLogo from "../../../../Assets/img/logo-animoca.png";
import nWayLogo from "../../../../Assets/img/logo-nway.png";
import bearX from "../../../../Assets/img/bearx.png";

import { useHistory } from "react-router";

import styles from "./styles.module.scss";
import ForteLogo from "../../../../Assets/svg/ForteLogo";

const Footer = () => {
  const history = useHistory();

  return (
    <footer className={styles.footer}>
      <article>
        <section>
          <div className={styles.div1}>
            <h2>FOLLOW US ON</h2>
            <div className={styles.social}>
              <a
                href="https://discord.com/channels/836387983635644416/836387983635644420"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  style={{ width: "27px", fill: "white" }}
                  viewBox="0 0 50 57"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M32.1094 24.4531C32.6927 25.0365 32.9844 25.7656 32.9844 26.6406C32.9844 27.5156 32.6927 28.2812 32.1094 28.9375C31.599 29.5208 30.9427 29.8125 30.1406 29.8125C29.6302 29.8125 29.1562 29.6667 28.7188 29.375C28.2812 29.0833 27.9167 28.7188 27.625 28.2812C27.4062 27.7708 27.2969 27.224 27.2969 26.6406C27.2969 26.2031 27.3698 25.8021 27.5156 25.4375C27.6615 25.0729 27.8438 24.7448 28.0625 24.4531C28.3542 24.1615 28.6823 23.9427 29.0469 23.7969C29.4115 23.651 29.776 23.5781 30.1406 23.5781C30.9427 23.5781 31.599 23.8698 32.1094 24.4531ZM17.8906 24.4531C18.474 23.8698 19.1667 23.5781 19.9688 23.5781C20.7708 23.5781 21.4271 23.8698 21.9375 24.4531C22.5208 25.0365 22.8125 25.7656 22.8125 26.6406C22.8125 27.5156 22.5208 28.2812 21.9375 28.9375C21.4271 29.5208 20.7708 29.8125 19.9688 29.8125C19.1667 29.8125 18.474 29.5208 17.8906 28.9375C17.3802 28.2812 17.125 27.5156 17.125 26.6406C17.125 25.7656 17.3802 25.0365 17.8906 24.4531ZM49.5 5.85938V56.0625C45.2708 52.3438 40.9323 48.4062 36.4844 44.25L38.0156 49.5H6.1875C4.65625 49.5 3.30729 48.9531 2.14062 47.8594C1.04688 46.6927 0.5 45.3073 0.5 43.7031V5.85938C0.5 4.25521 1.04688 2.90625 2.14062 1.8125C3.30729 0.645833 4.65625 0.0625 6.1875 0.0625H43.8125C45.3438 0.0625 46.6562 0.645833 47.75 1.8125C48.9167 2.90625 49.5 4.25521 49.5 5.85938ZM41.5156 32.3281C41.5156 29.7031 41.1875 27.0417 40.5312 24.3438C39.875 21.5729 39.1823 19.4948 38.4531 18.1094L37.4688 16.0312C36.7396 15.4479 35.9375 14.974 35.0625 14.6094C34.2604 14.1719 33.5312 13.8802 32.875 13.7344C32.2917 13.5156 31.7448 13.3698 31.2344 13.2969C30.724 13.151 30.3229 13.0781 30.0312 13.0781H29.5938L29.2656 13.5156C30.651 13.9531 31.9271 14.5 33.0938 15.1562C34.2604 15.7396 35.0625 16.2135 35.5 16.5781L36.1562 17.125C32.9479 15.3021 29.4479 14.3542 25.6562 14.2812C21.8646 14.2083 18.401 14.8646 15.2656 16.25L13.625 17.125C15.1562 15.6667 17.599 14.4271 20.9531 13.4062L20.7344 13.0781C18.1823 13.0781 15.5573 14.0625 12.8594 16.0312C12.5677 16.6146 12.2031 17.3802 11.7656 18.3281C11.3281 19.276 10.7083 21.2083 9.90625 24.125C9.17708 26.9688 8.8125 29.7031 8.8125 32.3281C8.95833 32.6927 9.21354 33.0938 9.57812 33.5312C10.0156 33.9688 10.9635 34.5885 12.4219 35.3906C13.8802 36.1927 15.5208 36.5938 17.3438 36.5938C18.0729 35.7917 18.6927 35.026 19.2031 34.2969C18.1823 34.0052 17.2344 33.6042 16.3594 33.0938C15.5573 32.5104 15.0104 32 14.7188 31.5625L14.2812 31.0156C14.4271 31.0885 14.5729 31.1979 14.7188 31.3438C14.9375 31.4167 15.1198 31.4896 15.2656 31.5625C15.4115 31.6354 15.4844 31.6719 15.4844 31.6719C17.9635 33.0573 20.6979 33.8958 23.6875 34.1875C26.75 34.4062 29.849 33.8958 32.9844 32.6562C34.0781 32.2917 35.1354 31.7448 36.1562 31.0156C35.2083 32.5469 33.5312 33.6771 31.125 34.4062L32.9844 36.5938C34.151 36.5938 35.2083 36.4479 36.1562 36.1562C37.1771 35.7917 37.9792 35.4271 38.5625 35.0625C39.2188 34.625 39.7656 34.224 40.2031 33.8594C40.7135 33.4219 41.0417 33.0573 41.1875 32.7656L41.5156 32.3281Z" />
                </svg>
                <br />
                <p> Discord </p>
              </a>
              <a
                href="https://www.facebook.com/Battlepalooza-112765480597639"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  style={{ width: "28px" }}
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
                <p> Facebook </p>
              </a>
              <a
                href="https://twitter.com/battlepalooza"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  style={{ width: "30px" }}
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
                <p> Twitter</p>
              </a>
              <a
                href="https://www.instagram.com/BATTLEPALOOZA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  style={{ width: "30px" }}
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
                <p> Instagram</p>
              </a>
              <a
                href="https://youtube.com/channel/UCKiNBKlBghKR9a0x-Il8WkA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  style={{ width: "38px" }}
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
                <p> YouTube</p>
              </a>
            </div>
            <div className={styles.brands}>
              <img
                src={animocaLogo}
                alt="Animoca Logo"
                data-pagespeed-url-hash="3690970617"
              />
              <img
                src={nWayLogo}
                alt="nWay Logo"
                data-pagespeed-url-hash="3262642918"
              />
              <div
                className={styles.forteLogo}
              >
                <ForteLogo/>
              </div>
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
                  <ul>
                    <li>
                      <span
                        className={styles.linkFooter}
                        onClick={() => {
                          history.push("/privacy-policy");
                          window.scroll(0, 0);
                        }}
                      >
                        Privacy Policy
                      </span>
                    </li>
                    <li>|</li>
                    <li>
                      <span
                        className={styles.linkFooter}
                        onClick={() => {
                          history.push("/terms-of-service");
                          window.scroll(0, 0);
                        }}
                      >
                        Terms of Service
                      </span>
                    </li>
                    <li>|</li>
                    {/* <li>
                      <span className={styles.linkFooter}>Whitepaper</span>
                    </li>
                    <li>|</li> */}
                    <li>
                      <a
                        className={styles.linkFooter}
                        href="https://support.nwayplay.com/hc/en-us/sections/5554671847447-Battlepalooza"
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
        </section>
      </article>
    </footer>
  );
};

export default Footer;
