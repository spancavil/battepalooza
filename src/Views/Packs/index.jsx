import React, { useContext } from 'react';
import Background from '../../Global-Components/Background';
import SocialMedia from '../Home/Components/SocialMedia';
import styles from './styles.module.scss';
import Card from '../../Global-Components/Card';
import { UserData } from '../../Context/UserProvider';

const Packs = () => {

  const { packs, setPack } = useContext(UserData)

  const setSelectedCard = (packId) => {
    setPack (packId);
  }

  return (
    <Background>
      <div className={styles.packContainer}>
        <div className={styles.banner}>
          BANNER IMG
        </div>
        <h4>
          SKINS PACKS
        </h4>
        <div className={styles.cardContainer}>
          {packs.map(pack => {
            return <Card
              key ={pack.id}
              imgSrc={pack.imgSrc}
              text1={pack.text1}
              text2={pack.text2}
              text3={pack.text3}
              soldOut={pack.soldOut}
              sale={pack.sale}
              handleClick={() => setSelectedCard(pack.id)}
            />
          })}
        </div>
        <SocialMedia />
      </div>
    </Background>
  );
};

export default Packs;
