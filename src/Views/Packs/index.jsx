import React, { useContext, useState } from 'react';
import Background from '../../Global-Components/Background';
import SocialMedia from '../Home/Components/SocialMedia';
import styles from './styles.module.scss';
import Card from '../../Global-Components/Card';
import { CardData } from '../../Context/CardDataProvider';
import ScrollBar from './Components/ScrollBar';
import { useMediaQuery } from '../../Hooks/useMediaQuery';

const Packs = () => {

  const { packs, setPack } = useContext(CardData)
  const [scroll, setScroll]= useState({scrollLeft: "", scrollWidth: ""})
  const queryTablet = useMediaQuery("(max-width: 766px)");

  console.log(queryTablet);

  const setSelectedCard = (packId) => {
    setPack (packId);
  }

  const handleScroll = (e) => {
    setScroll({
      scrollLeft: e.target.scrollLeft,
      scrollWidth: e.target.scrollWidth - e.target.offsetWidth
    })
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
        <div className={styles.cardContainer} onScroll={handleScroll}>
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
        {queryTablet && <ScrollBar width={scroll.scrollWidth} position={scroll.scrollLeft} elements={packs.length}/>}
        <SocialMedia />
      </div>
    </Background>
  );
};

export default Packs;
