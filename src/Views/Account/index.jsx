import React, { useState } from 'react';
import AccountData from './Components/AccountData';
import AccountMenu from './Components/AccountMenu';
import styles from './styles.module.scss';

const Account = () => {

  const [menuClickeado, setMenuClickeado] = useState("OVERVIEW")

  const handleClick = (title) => {
    setMenuClickeado(title)
  }
  console.log(menuClickeado);
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <div className={styles.dataContainer}>
          <AccountMenu handleClick={handleClick}/>
          {menuClickeado === "OVERVIEW" && <AccountData />}
        </div>
      </div>
    </div>
  );
};

export default Account;
