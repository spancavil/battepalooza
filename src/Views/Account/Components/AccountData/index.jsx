import React from 'react';
import Ncoin from '../../../../Assets/svg/Ncoin';
import styles from './styles.module.scss';

const AccountData = ({
  title = 'Jhon',
  id = '2457',
  date = 'July, 2021',
  linked = true,
  nCoins = '1.000.000',
}) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{title}#{id}</h4>
      <p className={styles.joined}>Joined {date}</p>
      {linked && <p className={styles.linked}>Account linked to Mobile App</p>}
      <div className={styles.nCoin}>
        <Ncoin />
        <span>{nCoins} NCoin</span>
      </div>
    </div>
  );
};

export default AccountData;
