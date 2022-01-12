import React, {useEffect, Fragment, useState} from 'react';
import {useParams} from 'react-router-dom';
import Background from '../../Global-Components/Background';
import Button from '../../Global-Components/Button';
import styles from './styles.module.scss';
import {dropsList} from '../../Services/dropList';
import {useHistory} from 'react-router-dom';
import Modal from '../../Global-Components/Modal';

const DropDetail = () => {
  const [dropSelected, setDropSelected] = useState ();
  const [open, setOpen] = useState (false);
  const {id} = useParams ();
  const history = useHistory ();

  useEffect (
    () => {
      setDropSelected (dropsList.filter (drop => drop.id === parseInt (id)));
    },
    [id]
  );

  useEffect (
    () => {
      if (parseInt (id) !== 1 && parseInt (id) !== 2) history.push ('/drop');
    },
    [id, history]
  );

  return (
    <Background>
      {dropSelected
        ? <Fragment>
            <p className={styles.back} onClick = {()=> history.goBack()}>
              &#60; Go back
            </p>
            <div className={styles.container}>
              <div className={styles.card}>
                <div className={styles.imgContainer}>
                  <img src={dropSelected[0].img} alt={dropSelected[0].title} />
                </div>
                <div className={styles.text}>
                  <h3 className={styles.rare}>
                    {dropSelected[0].content}
                    <br />
                    {dropSelected[0].subtitle}
                    <br />
                    {dropSelected[0].quantity.split ('/')[0]} Pack Left
                  </h3>
                  <div>
                    <p>
                      You will be able to obtain the following through this pack:
                      <br />
                      <br />
                      1 Rare Skin
                      <br />
                      2 Common Skin
                    </p>
                  </div>
                  <h3 className={styles.price}>
                    Price {' '}
                    <b style={{color: '#1892F0'}}>
                      {dropSelected[0].price} NCoin
                    </b>
                  </h3>
                  <div className={styles.buttonContainer}>
                    <Button title="BUY" onClick={() => setOpen (!open)} />
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        : <p>Cargando</p>}
      {open
        ? <div className={styles.modalContainer}>
            <Modal handleClose={() => setOpen (!open)} title={'Checkout'}>
              <p className={styles.modalText}>Will you use 20.000 Ncoin to buy Rare Pack?</p>
              <Button title="BUY" />
              <p className={styles.chargeNow}>Not enough Ncoin? Charge now</p>
            </Modal>
          </div>
        : null}
    </Background>
  );
};

export default DropDetail;
