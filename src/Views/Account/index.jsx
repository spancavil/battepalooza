import React from 'react';
import AccountData from './Components/AccountData';
import AccountMenu from './Components/AccountMenu';
import styles from './styles.module.scss';

const Account = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <AccountMenu />
        <AccountData />
      </div>
    </div>
  );
};

export default Account;
