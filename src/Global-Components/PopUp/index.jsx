import React from 'react';
import styles from './styles.module.scss';

const PopUp = ({text = 'Algo ocurrio'}) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default PopUp;
