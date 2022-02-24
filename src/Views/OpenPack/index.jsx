import React, {useContext, useState} from 'react';
import Background from '../../Global-Components/Background';
import Button from '../../Global-Components/Button';
import styles from './styles.module.scss';
import {CardData} from '../../Context/CardDataProvider';
import {useHistory} from 'react-router';
import CardAnimation from '../CardAnimation';

/* NO SE ESTA USANDO ESTE COMPONENTE, E IBA EN LA RUTA /open-pack */
const OpenPack = () => {
  const [flow, setFlow] = useState (1);
  const {packToOpen} = useContext (CardData);

  const history = useHistory ();

  const nextFlow = () => {
    setFlow (flow + 1);
  };

  const openLater = () => {
    history.push ('/my-packs');
  };

  const timerFlow = () => {
    setTimeout (() => {
      setFlow (flow + 1);
    }, 3000);
  };

  return (
    <Background>
      {flow === 1 &&
        <div className={styles.container}>
          <div className={styles.deg}>
            <div className={styles.card}>
              <img src={packToOpen.imgSrc} alt="pack" />
              <div className={styles.down}>
                <Button title="OPEN" onClick={nextFlow} />
                <p onClick={openLater}>OPEN LATER</p>
              </div>
            </div>
          </div>
        </div>}
      {flow === 2 &&
        <div className={styles.container2}>
          <h2>Video "open pack" playing...</h2>
          {timerFlow ()}
        </div>}
      {flow === 3 && <CardAnimation />}
    </Background>
  );
};

export default OpenPack;
