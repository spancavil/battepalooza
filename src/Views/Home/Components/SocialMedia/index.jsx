import React from 'react';
import facebookLogo from '../../../../Assets/img/facebook.png';
import instagramLogo from '../../../../Assets/img/instagram.png';
import discordLogo from '../../../../Assets/img/discord.png';
import styles from './styles.module.scss';
import Button from '../../../../Global-Components/Button';

const SocialMedia = () => {
    return (
        <div className={styles.socialMedia}>
            <div className={styles.container}></div>
            <img className={styles.fb}src={facebookLogo} alt="fb-logo" />
            <img className={styles.ig}src={instagramLogo} alt="ig-logo" />
            <img className={styles.discord}src={discordLogo} alt="discord-logo" />
        </div>
    )
}

export default SocialMedia
