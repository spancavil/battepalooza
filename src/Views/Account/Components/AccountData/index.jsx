import React from 'react';
import styles from './styles.module.scss';
import nCoin from '../../../../Assets/img/icon-ncoin.png';

// Por ahora esta Hardcodeado pero cuando
// tengamos la api hay que crear los estados
// y las funciones

const AccountData = ({
  title = 'Jhon',
  id = '2457',
  date = 'July, 2021',
  linked = true,
  nCoins = 1000000,
}) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{title}#{id}</h4>
      <p className={styles.joined}>Joined {date}</p>
      {linked && <p className={styles.linked}>Account linked to Mobile App</p>}
      <div className={styles.nCoin}>
        <img className={styles.img} src={nCoin} alt="nCoin" />
        <span>{nCoins} NCoin</span>
      </div>
    </div>
  );
};

export default AccountData;
