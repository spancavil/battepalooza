import React from "react";
import styles from "./styles.module.scss";
import background from "../../../../Assets/img/authLayer/auth-bg.png";
import char1 from "../../../../Assets/img/authLayer/char1.png";
import char2 from "../../../../Assets/img/authLayer/char2.png";
import char3 from "../../../../Assets/img/authLayer/char3.png";

const LeftBanner = () => {
    return (
        <div className={styles.leftBanner}>
            <img src={background} className={styles.background} alt="auth-bg" />
            <img src={char1} className={styles.char1} alt="char1" />
            <img src={char2} className={styles.char2} alt="char2" />
            <img src={char3} className={styles.char3} alt="char1" />
        </div>
    );
};

export default LeftBanner;
