import React, {useContext, useState} from 'react';
import {Redirect} from 'react-router';
import {UserData} from '../../Context/UserProvider';
import Background from '../../Global-Components/Background';
import AccountData from './Components/AccountData';
import AccountMenu from './Components/AccountMenu';
import styles from './styles.module.scss';

const Account = () => {
  const [menuClickeado, setMenuClickeado] = useState ('OVERVIEW');
  const {userData} = useContext (UserData);

  const handleClick = title => {
    setMenuClickeado (title);
  };

  return !userData
    ? <Redirect to="/needlogin" />
    : <Background>
        <div className={styles.dataContainer}>
          <AccountMenu handleClick={handleClick} />
          {menuClickeado === 'OVERVIEW' && <AccountData />}
        </div>
      </Background>;
};

export default Account;
