import React from 'react';
import styles from './styles.module.scss';

const Divider = () => {
  return (
    <div className={styles.container}>
        <div className={styles.line}></div>
        <p className={styles.text}>Already have an account? Log in</p>
        <div className={styles.line}></div>
    </div>
  )
}

export default Divider