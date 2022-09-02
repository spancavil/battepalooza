import React from "react";
import styles from './styles.module.scss';

const AuthDialog = ({title, children}) => {
    return <div className={styles.authDialog}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {children}
    </div>;
};

export default AuthDialog;
