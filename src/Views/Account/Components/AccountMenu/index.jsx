import React from 'react';
import { buttons } from './buttons';
import styles from './styles.module.scss';

const AccountMenu = () => {
  return (
    <div className={styles.btnContainer}>
      {buttons.map (({title, onClick}) => (
        <button key={title} onClick={onClick}>{title}</button>
      ))}
    </div>
  );
};

export default AccountMenu;
