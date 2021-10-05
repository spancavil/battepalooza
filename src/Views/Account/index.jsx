import React, {useState} from 'react';
import Background from '../../Global-Components/Background';
import AccountData from './Components/AccountData';
import AccountMenu from './Components/AccountMenu';
import styles from './styles.module.scss';
import Card from '../../Global-Components/Card';
import imagen from '../../Assets/sprites/cardpack01.png';

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
        <Card
            imgSrc={imagen}
            text1="Rare Series 1 Release"
            text2="1 - DROP 1"
            sale={true}
            soldOut={false}
        ></Card>
        </div>
    </Background>
  );
};

export default Account;
