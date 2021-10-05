import React, { useContext } from 'react';
import Background from '../../Global-Components/Background';
import SocialMedia from '../Home/Components/SocialMedia';
import styles from './styles.module.scss';
import Card from '../../Global-Components/Card';
import { UserData } from '../../Context/UserProvider';

const Packs = () => {

  const { cards, setCard } = useContext(UserData)

  const setSelectedCard = (cardId) => {
    console.log(cardId);
    setCard (cardId);
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
          {cards.map(card => {
            return <Card
              key ={card.id}
              imgSrc={card.imgSrc}
              text1={card.text1}
              text2={card.text2}
              text3={card.text3}
              soldOut={card.soldOut}
              sale={card.sale}
              handleClick={() => setSelectedCard (card.id)}
            />
          })}
        </div>
        <SocialMedia />
      </div>
    </Background>
  );
};

export default Packs;
