import React, {useContext, useEffect, useState} from 'react';
import styles from './styles.module.scss';
import nCoin from '../../../../Assets/img/icon-ncoin.png';
import {UserData} from '../../../../Context/UserProvider';
import {separator} from '../../../../Utils/separator';
import generateDate from '../../../../Utils/createDate';

// Por ahora esta Hardcodeado pero cuando
// tengamos la api hay que crear los estados
// y las funciones

const AccountData = ({date = 'July, 2021', linked = true}) => {
  const {userData, coins} = useContext (UserData);
  const [id, setId] = useState ('');
  const [monedas, setMonedas] = useState()

  useEffect (
    () => {
      userData._id && setId (userData._id.slice (-4));
    },
    [userData]
  );

  useEffect (
    () => {
      setMonedas (separator (coins));
    },
    [coins]
  );

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{userData.name}#{id}</h4>
      <p className={styles.joined}>Joined {generateDate(userData.created_at)}</p>
      {/* {linked && <p className={styles.linked}>Account linked to Mobile App</p>} */}
      <p className = {styles.linked}>{userData.email}</p>
      <div className={styles.nCoin}>
        <img className={styles.img} src={nCoin} alt="nCoin" />
        <span>{monedas} NCoin</span>
      </div>
    </div>
  );
};

export default AccountData;
