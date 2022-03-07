import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Background from '../../Global-Components/Background';
import Button from '../../Global-Components/Button';
import styles from './styles.module.scss';
import { dropsList } from '../../Services/dropList';
import { useHistory } from 'react-router-dom';
import Modal from '../../Global-Components/Modal';
import dropDetailExample from '../../Assets/img/dropDetailExample.png';
import NftCard from './components/NftCard';

const DropDetail = () => {
  const [dropSelected, setDropSelected] = useState();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const divHero = useRef()

    //Set background with useRef
    useEffect(() => {
      if (dropSelected) {
        divHero.current.style.background = `black url(${dropDetailExample}) no-repeat center top`;
        divHero.current.style.backgroundSize = 'contain';
      }
    }, [divHero, dropSelected])

  useEffect(
    () => {
      const drop = dropsList.filter(drop => drop.id === parseInt(id))[0]
      if (drop) {
        setDropSelected(drop);
      }
      else {
        history.push('/drop');
      }
    },
    [id, history]
  );

  console.log(dropSelected);

  return (
    <Background>
      {dropSelected
        ? <>
          <p className={styles.back} onClick={() => history.goBack()}>
            &#60; Go back
          </p>
          <div className={styles.container}>
            <div className={styles.rectangle}>

            <div className={styles.hero} ref={divHero}>
            </div>

            <div className={styles.nftsContainer}>
              {dropSelected?.content?.map(nft => {
                return <NftCard nft={nft} key={nft.uniqueId}/>
              })}
            </div>

            </div>
          </div>
        </>
        : <p>Loading</p>}
      {open
        ? <div className={styles.modalContainer}>
          <Modal handleClose={() => setOpen(!open)} title={'Checkout'}>
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
