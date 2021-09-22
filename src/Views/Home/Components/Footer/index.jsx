import React from 'react';
import styles from './style.module.scss';
import TwitterLogo from '../../../../Assets/svg/TwitterLogo';
import logoAnimoca from '../../../../Assets/img/logo-animoca.png';
import logoNway from '../../../../Assets/img/logo-nway.png';
import FacebookSquare from '../../../../Assets/svg/facebookSquare';
import InstagramLogo from '../../../../Assets/svg/InstagramLogo';
import YoutubeLogo from '../../../../Assets/svg/YoutubeLogo';
import bearX from '../../../../Assets/img/bearx.png'

const Footer = () => {
    return (
        <div className={styles.container}>
            <h2>FOLLOW US ON</h2>
            <div className={styles.social}>
                <a href="https://www.facebook.com/Battlepalooza-112765480597639"><FacebookSquare className={styles.esevege}/><br/>Facebook</a>
                <a href="https://twitter.com/battlepalooza"><TwitterLogo className={styles.esevege}/><br/>Twitter</a>
                <a href="https://www.instagram.com/BATTLEPALOOZA"><InstagramLogo className={styles.esevege}/><br/>Instagram</a>
                <a href="https://youtube.com/channel/UCKiNBKlBghKR9a0x-Il8WkA"><YoutubeLogo className={styles.esevege}/><br/>Youtube</a>
            </div>
            <div className={styles.brand}>
                <img alt="animoca-logo" src={logoAnimoca}/>
                <img alt="nWay-logo" src={logoNway}/>
            </div>
            <div className={styles.textWidget}>
                <p>© 2020 nWay – All Rights Reserved.</p>
            </div>
            <div>
                <ul className={styles.footerNav}>
                    <li><a href="http://battlepalooza.com/news/">Privacy Policy |</a></li>
                    <li><a href="http://battlepalooza.com/terms-of-service/"> Terms of Service |</a></li>
                    <li><a href="https://nway.helpshift.com/a/battlepalooza/?p=web"> Report an In-Game Issue</a></li>
                </ul>
            </div>
            <img alt="bearX" className={styles.bearX} src={bearX}/>
        </div >
    )
}

export default Footer
