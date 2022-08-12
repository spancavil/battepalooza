import React, { useContext, useState } from 'react';
import Background from '../../Global-Components/Background';
import Button from '../../Global-Components/Button';
import styles from './styles.module.scss';
import { PackData } from '../../Context/PackProvider';
import CardAnimation from '../CardAnimation';
import Loader from '../../Global-Components/Loader';

/* NO SE ESTA USANDO ESTE COMPONENTE, E IBA EN LA RUTA /open-pack */
const OpenPack = () => {
  const [flow, setFlow] = useState(1);
  const { packSelected } = useContext(PackData);
  const [loading, setLoading] = useState(false);
  const [canContinue, setCanContinue] = useState(false);


  const nextFlow = () => {
    setFlow(flow + 1);
  };

  // const openLater = () => {
  //   history.push ('/');
  // };

  const timerFlow = () => {
    setTimeout(() => {
      setCanContinue(true);
    }, 7000);
  };

  const handleContinue = () => {
    nextFlow()
  }

  console.log(packSelected);

  return (
    <Background>
      {flow === 1 &&
        <div className={styles.container}>
          <div className={styles.deg}>
            <div className={styles.card}>
              <img src={packSelected.thumbnailUrl} alt="pack" />
              <div className={styles.down}>
                <Button title="OPEN" onClick={nextFlow} />
                {/* <p onClick={openLater}>OPEN LATER</p> */}
              </div>
            </div>
          </div>
        </div>}
      {flow === 2 &&
        <div className={styles.container2}>
          <div className={styles.videoContainer}>
            {packSelected.openMovieUrl ? (
              <>
                {loading && (
                  <div className={styles.loadMessageContainer}>
                    <Loader />
                  </div>
                )}
                <video
                  onCanPlayThrough={() => {
                    setLoading(false)
                    timerFlow()
                  }}
                  className={styles.pinVideo}
                  src={packSelected.openMovieUrl}
                  muted
                  autoPlay
                />
              </>
            )
              :
              <h2>Video under development...</h2>
            }
            {canContinue && (
              <div style = {{zIndex: 2, overflow: 'visible'}}>
                <Button onClick={handleContinue} title={"Continue"} />
              </div>
            )}
          </div>
        </div>}
      {flow === 3 && <CardAnimation />}
    </Background>
  );
};

export default OpenPack;
