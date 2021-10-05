import React, {useState} from 'react';
import Background from '../../Global-Components/Background';
import AccountData from './Components/AccountData';
import AccountMenu from './Components/AccountMenu';
import styles from './styles.module.scss';

const Account = () => {
  const [menuClickeado, setMenuClickeado] = useState ('OVERVIEW');

  const handleClick = title => {
    setMenuClickeado (title);
  };

  return (
    <Background>
      <div className={styles.dataContainer}>
        <AccountMenu handleClick={handleClick} />
        {menuClickeado === 'OVERVIEW' && <AccountData />}
        </div>
    </Background>
  );
};

export default Account;
