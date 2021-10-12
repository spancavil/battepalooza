import React, {useContext, useState} from 'react';
import Background from '../../Global-Components/Background';
import SocialMedia from '../Home/Components/SocialMedia';
import styles from './styles.module.scss';
import Card from '../../Global-Components/Card';
import {CardData} from '../../Context/CardDataProvider';
import {useMediaQuery} from '../../Hooks/useMediaQuery';
import {useHistory} from 'react-router-dom';
import {Redirect} from 'react-router';
import ScrollBar from '../../Global-Components/ScrollBar';

const Packs = () => {
  const {packs, setPack} = useContext (CardData);
  const [scroll, setScroll] = useState ({scrollLeft: '', scrollWidth: ''});
  const queryTablet = useMediaQuery ('(max-width: 766px)');
  const userStorage = JSON.parse (localStorage.getItem ('user'));

  const history = useHistory ();

  const setSelectedCard = packId => {
    setPack (packId);
    history.push (`/packs/${packId}`);
  };

  const handleScroll = e => {
    setScroll ({
      scrollLeft: e.target.scrollLeft,
      scrollWidth: e.target.scrollWidth - e.target.offsetWidth,
    });
  };

  return !userStorage
    ? <Redirect to="/needlogin" />
    : <Background>
        <div className={styles.packContainer}>
          <div className={styles.banner}>
            BANNER IMG
          </div>
          <h4>
            SKINS PACKS
          </h4>
          <div className={styles.cardContainer} onScroll={handleScroll}>
            {packs.map (pack => {
              return (
                <Card
                  key={pack.id}
                  imgSrc={pack.imgSrc}
                  text1={pack.description.text1}
                  text2={pack.description.text2}
                  text3={pack.description.text3}
                  soldOut={pack.soldOut}
                  sale={pack.sale}
                  handleClick={() => setSelectedCard (pack.id)}
                />
              );
            })}
          </div>
          {queryTablet &&
            <ScrollBar
              width={scroll.scrollWidth}
              position={scroll.scrollLeft}
              elements={packs.length}
            />}
          <SocialMedia />
        </div>
      </Background>;
};

export default Packs;
