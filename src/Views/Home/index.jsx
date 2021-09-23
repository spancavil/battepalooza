import React from 'react';
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

const HomeContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content1}>
        <div className={styles.battle}>
          <img src={bpBrand} alt="bp-brand" />
          <div className={styles.botones}>
            <Button title="Watch trailer" />
            <Button title="Download now" />
          </div>
        </div>
      </div>
      <div className={styles.contents}>
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
                    <img
                      src="http://battlepalooza.com/wp-content/themes/hemingway/assets/images/facebook-square-brands.svg"
                      alt="Follow Facebook"
                      data-pagespeed-url-hash="782064099"
                      onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                    />
                    <br />
                    Facebook
                  </a>
                  <a href="https://twitter.com/battlepalooza" target="_blank" rel="noopener noreferrer">
                    <img
                      src="http://battlepalooza.com/wp-content/themes/hemingway/assets/images/twitter-brands.svg"
                      alt="Follow Twitter"
                      data-pagespeed-url-hash="1876952424"
                      onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                    />
                    <br />
                    Twitter
                  </a>
                  <a
                    href="https://www.instagram.com/BATTLEPALOOZA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {' '}
                    <img
                      src="http://battlepalooza.com/wp-content/themes/hemingway/assets/images/instagram-brands.svg"
                      alt="Follow Instagram"
                      data-pagespeed-url-hash="2979715429"
                      onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                    />
                    {' '}
                    <br />
                    {' '}
                    Instagram
                  </a>
                  <a
                    href="https://youtube.com/channel/UCKiNBKlBghKR9a0x-Il8WkA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {' '}
                    <img
                      src="http://battlepalooza.com/wp-content/themes/hemingway/assets/images/youtube-brands.svg"
                      alt="Follow YouTube"
                      data-pagespeed-url-hash="4151425780"
                      onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                    />
                    {' '}
                    <br />
                    {' '}
                    YouTube
                  </a>

                </div>
                <div className={styles.brands}>
                  <img
                    src="http://battlepalooza.com/wp-content/themes/hemingway/assets/images/logo-animoca.png"
                    alt="Animoca Logo"
                    data-pagespeed-url-hash="3690970617"
                    onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                  />
                  <img
                    src="http://battlepalooza.com/wp-content/themes/hemingway/assets/images/logo-nway.png"
                    alt="nWay Logo"
                    data-pagespeed-url-hash="3262642918"
                    onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                  />
                </div>

                <div className={styles.widget}>
                  <div class="widget-content">
                    {' '}<div class="textwidget">
                      <p>© 2020 nWay – All Rights Reserved.</p>
                    </div>
                  </div>
                </div>
                <div className={styles.menu}>
                  <div class="widget-content">
                    <div class="menu-footer-container">
                      <ul id="menu-footer" class="menu">
                        <li>
                          <a href="http://battlepalooza.com/news/"
                          target="_blank"
                          rel="noopener noreferrer">
                            Privacy Policy
                          </a>
                        </li>
                        <li>|</li>
                        <li
                          id="menu-item-40"
                          class="menu-item menu-item-type-post_type menu-item-object-post menu-item-40"
                        >
                          <a href="http://battlepalooza.com/terms-of-service/"
                          target="_blank"
                          rel="noopener noreferrer">
                            Terms of Service
                          </a>
                        </li>
                        <li>|</li>
                        <li
                          id="menu-item-42"
                          class="menu-item menu-item-type-custom menu-item-object-custom menu-item-42"
                        >
                          <a href="https://nway.helpshift.com/a/battlepalooza/?p=web"
                          target="_blank"
                          rel="noopener noreferrer">
                            Report an In-Game Issue
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <img
                  className={styles.bear}
                  src="http://battlepalooza.com/wp-content/themes/hemingway/assets/images/bear.png"
                  alt="bearX"
                />
              </div>
            </section>
          </article>
        </footer>
      </div>
      <SocialMedia />
    </div>
  );
};

export default HomeContainer;
