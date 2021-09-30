import React from 'react';
import {buttons} from './buttons';
import styles from './styles.module.scss';

const AccountMenu = ({handleClick}) => {
  return (
    <div className={styles.btnContainer}>
      {buttons.map (({title}) => (
        <button key={title} onClick={()=> handleClick(title)}>{title}</button>
      ))}
    </div>
  );
};

export default AccountMenu;
