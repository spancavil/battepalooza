import { Link } from "react-router-dom";
import AnimocaLogo from "../../Assets/img/animocaLogo.png";
import NwayLogo from "../../Assets/img/nWayLogo.png";

import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
} from "../../Assets/svg/SocialMediaLogos";

import styles from "./styles.module.scss";

const Footer = () => {
  const IconsLinks = [
    {
      icon: <FacebookLogo />,
      href: "https://www.facebook.com/battlepalooza/",
    },
    {
      icon: <TwitterLogo />,
      href: "https://twitter.com/battlepalooza",
    },
    {
      icon: <InstagramLogo />,
      href: "https://www.instagram.com/BATTLEPALOOZA/",
    },
    {
      icon: <YoutubeLogo />,
      href: "https://www.youtube.com/channel/UCKiNBKlBghKR9a0x-Il8WkA",
    },
  ];

  return (
    <>
      <div className={styles.effect} />
      <footer className={styles.footer}>
        <div className={styles.left}>
          <div className={styles.logos}>
            <img src={AnimocaLogo} alt="Animoca Logo" />
            <img src={NwayLogo} alt="nWay Logo" />
          </div>
          <p>2020 nWay - All Rights Reserved.</p>
          <p>
            <Link to={"/privacy-policy"}>Privacy Policy</Link> |
            <Link to={"/terms-of-service"}> Terms of Service </Link> |
            <a
              href="https://support.nwayplay.com/hc/en-us/sections/5554671847447-Battlepalooza"
              target={"_blank"}
              rel="noreferrer"
            >
              Report an In-Game Issue
            </a>
          </p>
        </div>
        <div className={styles.right}>
          <span>Follow Us On</span>
          <div className={styles.icons}>
            {IconsLinks.map(({ icon, href }) => (
              <a href={href} target="_blank" rel="noreferrer">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
