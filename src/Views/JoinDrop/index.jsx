import React, {useContext, useEffect, useState} from 'react';
import Background from '../../Global-Components/Background';
import Modal from '../../Global-Components/Modal';
import Button from '../../Global-Components/Button';
import styles from './styles.module.scss';
import SubMessage from '../../Global-Components/SubMessage';
import {createRandomNumber} from '../../Utils/createQueue';
import ProgressBar from './components/ProgressBar';
import {CardData} from '../../Context/CardDataProvider';
import {useMediaQuery} from '../../Hooks/useMediaQuery';
import {useHistory} from 'react-router';
import ModalII from './components/Modal';

const JoinDrop = () => {
  const {packSelected, setPackForOpen} = useContext (CardData);
  const [number, setNumber] = useState ('');
  const [milliseconds, setMilliseconds] = useState (0);
  const [finishCount, setFinishCount] = useState (false);
  const [buy, setBuy] = useState (false);
  const pack = packSelected;

  const queryMobile = useMediaQuery ('(max-width: 575px');
  const history = useHistory ();

  const handleBuy = () => {
    // Aqui irá la logica de cuando el usuario compre un pack
    setBuy (true);
  };

  const handleCount = () => {
    setFinishCount (true);
  };

  const handleOpen = () => {
    setPackForOpen (packSelected);

    history.push ('/open-pack');
  };

  const handleLater = () => {
    history.push ('/collection/packs');
  };

  const handleClose = () => {
    history.push (`/packs/${pack.id}`);
  };

  const handleCloseConfirmation = () => {
    history.push ('/packs');
  };

  useEffect (() => {
    setNumber (createRandomNumber (5, 15));
  }, []);

  useEffect (
    () => {
      setMilliseconds (number * 500);
    },
    [number]
  );

  return (
    <Background>
      <div className={styles.parentContent}>
        <div className={styles.content}>
          <span className={styles.line1}>
            {pack.description.text1}
            {pack.description.text2}
            <br />
            {pack.stock}
            packs left
            <br />
            <br />
          </span>

          <span className={styles.line2}>
            You are in Line! <br />
          </span>
          <span className={styles.line3}>
            <br />Your number is {number} <br /><br />
          </span>
          <span className={styles.line4}>
            Expected wait time {number * 0.5} seconds
          </span>
          {!finishCount &&
            <ProgressBar
              width={'100%'}
              totalTime={milliseconds}
              finish={handleCount}
            />}
          {finishCount &&
            <div
              style={{
                width: '100%',
                border: '1px solid white',
                height: '33px',
              }}
            >
              <div
                style={{
                  width: '100%',
                  backgroundColor: '#0146D5',
                  height: '33px',
                }}
              />
            </div>}
        </div>
        <div className={styles.cardImage}>
          <img src={pack.imgSrc} alt="pack" />
        </div>
      </div>
      {finishCount &&
        !buy &&
        <div className={styles.parentContainerModal}>
          <Modal title="Checkout" handleClose={handleClose}>
            <h3 className={styles.textDrop}>
              Will you use
              {pack.price}
              nCoin to buy
              {pack.description.text1}
              pack?
            </h3>
            <Button title="BUY" width="176px" onClick={handleBuy} />
            <SubMessage
              text="Not enough nCoin?"
              link="/account"
              textLink="Charge now"
            />
          </Modal>
        </div>}
      {buy &&
        <div className={styles.parentContainerModal}>
          <ModalII
            title="Confirmation"
            handleCloseConfirmation={handleCloseConfirmation}
          >
            <h3 className={styles.textDrop}>
              Congratulations! Your purchase was succesful!
              {' '}
              <br />
              Will you open the Pack now?
            </h3>
            <div className={styles.modalButtons}>
              <Button
                title="Open"
                onClick={handleOpen}
                width={queryMobile ? '126px' : '176px'}
              />
              <Button
                title="Later"
                onClick={handleLater}
                width={queryMobile ? '126px' : '176px'}
                style={{backgroundColor: '#0149DB'}}
              />
            </div>
          </ModalII>
        </div>}
    </Background>
  );
};

export default JoinDrop;
