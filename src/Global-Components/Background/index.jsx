import React from 'react';
import styles from './styles.module.scss';

const Background = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <div className={styles.deg}>
            {children}
        </div>
      </div>
    </div>
  );
};

export default Background;
