import React from 'react';
import facebookLogo from '../../../../Assets/img/facebook.png';
import instagramLogo from '../../../../Assets/img/instagram.png';
import discordLogo from '../../../../Assets/img/discord.png';
import styles from './styles.module.scss';

const SocialMedia = () => {
    return (
        <div className={styles.socialMedia}>
            <a href="https://www.facebook.com/Battlepalooza-112765480597639"
            target="_blank"
            rel="noopener noreferrer"
            ><img className={styles.fb}src={facebookLogo} alt="fb-logo" /></a>
            <a href="https://www.instagram.com/BATTLEPALOOZA"
            target="_blank"
            rel="noopener noreferrer"
            ><img className={styles.ig}src={instagramLogo} alt="ig-logo" /></a>
            <a
                href="https://discord.com/channels/836387983635644416/836387983635644420"
                target="_blank"
                rel="noopener noreferrer"
            ><img className={styles.discord}src={discordLogo} alt="discord-logo" /></a>
        </div>
    )
}

export default SocialMedia
