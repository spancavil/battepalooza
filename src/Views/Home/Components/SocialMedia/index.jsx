import React from 'react';
import facebookLogo from '../../../../Assets/img/facebook.png';
import instagramLogo from '../../../../Assets/img/instagram.png';
import discordLogo from '../../../../Assets/img/discord.png';
import styles from './styles.module.scss';

const SocialMedia = () => {
    return (
        <div className={styles.socialMedia}>
            <a 
            href="https://www.facebook.com/Battlepalooza-112765480597639"
            target="_blank"
            rel="noopener noreferrer"
            style={{overflow: "visible"}}
            >
                <div>
                    <img src={facebookLogo} alt="fb-logo" />    
                </div>
            </a>
            <a href="https://www.instagram.com/BATTLEPALOOZA"
            target="_blank"
            rel="noopener noreferrer"
            style={{overflow: "visible"}}
            >
                <div>
                    <img src={instagramLogo} alt="ig-logo" />
                </div>
            </a>
            <a
            href="https://discord.gg/6SKaWTtMSb"
            target="_blank"
            rel="noopener noreferrer"
            style={{overflow: "visible"}}
            >
                <div>
                    <img src={discordLogo} alt="discord-logo" />
                </div>
            </a>
        </div>
    )
}

export default SocialMedia
